import { Box, Button, Flex, Link, Text, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import { api, ApiEndpoints, UnverifiedApiError } from '~components/Auth/api'
import { ILoginParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import { VerificationPending } from '~components/Auth/Verify'
import InputPassword from '~components/shared/Form/InputPassword'
import FormSubmitMessage from '~components/shared/Layout/FormSubmitMessage'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'
import InputBasic from '../shared/Form/InputBasic'
import GoogleAuth from './GoogleAuth'

type FormData = {
  keepLogedIn: boolean
} & ILoginParams

const useVerificationCodeStatus = () =>
  useMutation({
    mutationFn: async (email: string) => {
      return await api<{ email: string; expiration: string; valid: boolean }>(
        `${ApiEndpoints.VerifyCode}?email=${encodeURIComponent(email)}`
      )
    },
  })

const useResendVerificationCode = () =>
  useMutation({
    mutationFn: async (email: string) => {
      await api(ApiEndpoints.VerifyCode, {
        method: 'POST',
        body: { email },
      })
    },
  })

const SignIn = ({ email: emailProp }: { email?: string }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()
  const { setTitle, setSubtitle } = useOutletContext<AuthOutletContextType>()
  const methods = useForm<FormData>({
    defaultValues: { email: emailProp },
  })
  const { handleSubmit, watch } = methods
  const email = watch('email', emailProp)

  const {
    login: { mutateAsync: login, isError, error, reset },
  } = useAuth()
  const [verifyNeeded, setVerifyNeeded] = useState(false)
  const { mutateAsync: checkVerificationCodeStatus } = useVerificationCodeStatus()
  const { mutateAsync: resendVerificationCode } = useResendVerificationCode()

  useEffect(() => {
    // set SignUp title and description
    setTitle(t('signin_title'))
    setSubtitle(t('signin_subtitle'))

    // reset the form to clear the errors
    reset()
  }, [])

  const onSubmit = async (data: FormData) => {
    await login(data)
      .then(() => navigate(Routes.dashboard.base))
      .catch(async (e) => {
        if (e instanceof UnverifiedApiError && email) {
          try {
            const verificationData = await checkVerificationCodeStatus(email)
            if (verificationData.valid) {
              setVerifyNeeded(true)
              return
            }
            // Code expired, resend verification code
            await resendVerificationCode(email)
            setVerifyNeeded(true)
            toast({
              title: t('verification_code_resent', { defaultValue: 'Verification code resent!' }),
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } catch (error) {
            toast({
              title: t('error.title', { defaultValue: 'Error' }),
              description: (error as Error).message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        } else {
          throw e
        }
      })
  }

  if (verifyNeeded) {
    return <VerificationPending email={email} />
  }

  return (
    <>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={handleSubmit(onSubmit)} mb={6}>
          <Flex flexDirection='column' gap={4} mb={4}>
            <InputBasic
              formValue='email'
              label={t('email')}
              placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
              type='email'
            />
            <Flex flexDir='column' gap={0}>
              <InputPassword
                formValue='password'
                label={t('password')}
                placeholder={t('password_placeholder', { defaultValue: 'Enter your password' })}
                required
              />
              <Link as={NavLink} to={Routes.auth.recovery} fontSize='xs' fontWeight='bold' alignSelf='end'>
                {t('forgot_password_title')}
              </Link>
            </Flex>
          </Flex>
          <Button type='submit' w='full' colorScheme='black'>
            {t('signin')}
          </Button>
        </Box>
        <OrSeparator />
        <GoogleAuth />
      </FormProvider>

      <Text display={'flex'} justifyContent={'center'} alignItems={'center'} fontWeight='bold' fontSize='sm' mt={6}>
        {t('not_registred_yet')}
        <Link as={NavLink} to={Routes.auth.signUp} ml={1} fontWeight={'bold'} fontSize='sm'>
          {t('signup_title')}
        </Link>
      </Text>
      <FormSubmitMessage isError={isError} error={error} />
    </>
  )
}

export const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex h='px' w='full' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export const OrSeparator = () => {
  const { t } = useTranslation()

  return (
    <Flex align='center' mb={4}>
      <HSeparator />
      <Text color='gray.500' fontWeight='bold' mx={3.5} whiteSpace='nowrap' size='xs' textTransform='uppercase'>
        <Trans i18nKey='or_continue_with'>or continue with</Trans>
      </Text>
      <HSeparator />
    </Flex>
  )
}

export default SignIn
