import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { UnverifiedApiError } from '~components/Auth/api'
import { ILoginParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import { VerifyAccountNeeded } from '~components/Auth/Verify'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import CustomCheckbox from '../Layout/CheckboxCustom'
import InputCustom from '../Layout/InputCustom'
import GoogleAuth from './GoogleAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'

type FormData = {
  keepLogedIn: boolean
} & ILoginParams

const SignIn = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()
  const methods = useForm<FormData>()
  const { handleSubmit, watch } = methods
  const email = watch('email')

  const {
    login: { mutateAsync: login, isError, error, isPending },
  } = useAuth()
  const [verifyNeeded, setVerifyNeeded] = useState(false)

  const onSubmit = async (data: FormData) => {
    await login(data)
      .then(() => navigate('/organization'))
      .catch((e) => {
        if (e instanceof UnverifiedApiError) {
          setVerifyNeeded(true)
          return
        }
        throw e
      })
  }

  if (verifyNeeded) {
    return <VerifyAccountNeeded email={email} />
  }

  return (
    <Flex direction='column' gap={6}>
      <Box me='auto'>
        <Heading color={textColor} fontSize='4xl' mb={2.5}>
          {t('signin_title')}
        </Heading>
        <Text color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('signin_subtitle')}
        </Text>
      </Box>
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
          <InputCustom
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
            required
          />
          <InputCustom
            formValue='password'
            label={t('password')}
            placeholder={t('password_placeholder', { defaultValue: 'Enter your password' })}
            type='password'
            required
          />
          <Flex justifyContent='center' align='center'>
            <CustomCheckbox formValue='keepLogedIn' label={t('keep_me_logged', { defaultValue: 'Keep me logged' })} />

            <NavLink to='/account/recovery'>
              <Text color={textColorBrand} fontSize='sm' fontWeight='500' whiteSpace='nowrap'>
                {t('forgot_password')}
              </Text>
            </NavLink>
          </Flex>
          <Button type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h={50}>
            {t('signin')}
          </Button>
        </Flex>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt={0}>
        <Text fontWeight='400' fontSize='sm'>
          {t('not_registred_yet')}
          <NavLink to='/account/signup'>
            <Text color={textColorBrand} as='span' ms={1} fontWeight='500'>
              {t('create_account')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
      <FormSubmitMessage isError={isError} error={error} />
    </Flex>
  )
}

export const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex h='px' w='100%' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export default SignIn
