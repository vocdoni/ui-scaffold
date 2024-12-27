import { Button, Flex, Link, Text, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import { api, ApiEndpoints, UnverifiedApiError } from '~components/Auth/api'
import { ILoginParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import { VerificationPending } from '~components/Auth/Verify'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import InputPassword from '~components/Layout/InputPassword'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'
import CustomCheckbox from '../Layout/CheckboxCustom'
import InputBasic from '../Layout/InputBasic'
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
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()
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
    setSubTitle(t('signin_subtitle'))

    // reset the form to clearJ the errors
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
      <GoogleAuth />
      <Flex align='center'>
        <HSeparator />
        <Text color='gray.400' mx={3.5}>
          {t('or')}
        </Text>
        <HSeparator />
      </Flex>
      <FormProvider {...methods}>
        <Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDirection='column' gap={6}>
          <InputBasic
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
          />
          <InputPassword
            formValue='password'
            label={t('password')}
            placeholder={t('password_placeholder', { defaultValue: 'Enter your password' })}
            required
          />
          <Flex justifyContent='center' align='center'>
            <CustomCheckbox formValue='keepLogedIn' label={t('keep_me_logged', { defaultValue: 'Keep me logged' })} />

            <NavLink to={Routes.auth.recovery}>
              <Text fontSize='sm' fontWeight='500' whiteSpace='nowrap'>
                {t('forgot_password')}
              </Text>
            </NavLink>
          </Flex>
          <Button type='submit' w='100%' size='xl'>
            {t('signin')}
          </Button>
        </Flex>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt={0}>
        <Text fontWeight='400' fontSize='sm'>
          {t('not_registred_yet')}
          <Link as={NavLink} to={Routes.auth.signUp} ml={1} fontWeight={500}>
            {t('create_account')}
          </Link>
        </Text>
      </Flex>
      <FormSubmitMessage isError={isError} error={error} />
    </>
  )
}

export const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex h='px' w='100%' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export default SignIn
