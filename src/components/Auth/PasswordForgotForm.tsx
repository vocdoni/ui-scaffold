import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import InputBasic from '../Layout/InputBasic'
import { api, ApiEndpoints } from './api'

type ForgotPasswordFormValues = {
  email: string
}

const PasswordForgotForm: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const methods = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  })

  // Mutation for password recovery using bearedFetch and ApiEndpoints
  const passwordRecoveryMutation = useMutation({
    mutationFn: ({ email }: ForgotPasswordFormValues) =>
      api(ApiEndpoints.PasswordRecovery, {
        method: 'POST',
        body: { email },
      }),
  })

  const onSubmit = (data: ForgotPasswordFormValues) =>
    passwordRecoveryMutation.mutate(data, {
      onSuccess: () => {
        navigate(`${Routes.auth.passwordReset}?email=${encodeURIComponent(data.email)}`)
      },
      onError: (error) => {
        // we actually should not have errors except for internal server errors
        methods.setError('email', { type: 'manual', message: error.message })
      },
    })

  return (
    <>
      <FormProvider {...methods}>
        <Flex as='form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={6}>
          <InputBasic
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
            required
          />
          <Button type='submit' fontSize='sm' variant='solid' fontWeight='500' w='100%' h={50}>
            {t('forgot_password_reset_link')}
          </Button>
        </Flex>
      </FormProvider>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt={0}>
        <Text fontWeight='400' fontSize='sm'>
          {t('already_member')}
          <Link as={RouterLink} to={Routes.auth.signIn} ml={1} fontWeight={500}>
            {t('signin')}
          </Link>
        </Text>
      </Flex>
    </>
  )
}

export default PasswordForgotForm
