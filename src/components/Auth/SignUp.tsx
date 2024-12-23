import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, NavLink, Link as ReactRouterLink, useOutletContext } from 'react-router-dom'
import { IRegisterParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import { VerificationPending } from '~components/Auth/Verify'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import InputPassword from '~components/Layout/InputPassword'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { useSignupFromInvite } from '~src/queries/account'
import { Routes } from '~src/router/routes'
import CustomCheckbox from '../Layout/CheckboxCustom'
import { default as InputBasic } from '../Layout/InputBasic'
import GoogleAuth from './GoogleAuth'
import { HSeparator } from './SignIn'

export type InviteFields = {
  code: string
  address: string
  email: string
}

export type SignupProps = {
  invite?: InviteFields
}

type FormData = {
  terms: boolean
} & IRegisterParams

const SignUp = ({ invite }: SignupProps) => {
  const { t } = useTranslation()
  const { register } = useAuth()
  const inviteSignup = useSignupFromInvite(invite?.address)
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  const methods = useForm<FormData>({
    defaultValues: {
      terms: false,
      email: invite?.email,
    },
  })
  const { handleSubmit, watch } = methods
  const email = watch('email')

  const isPending = register.isPending || inviteSignup.isPending
  const isError = register.isError || inviteSignup.isError
  const error = register.error || inviteSignup.error

  useEffect(() => {
    setTitle(t('signup_title'))
    setSubTitle(t('signup_subtitle'))
  }, [])

  const onSubmit = (user: FormData) => {
    if (!invite) {
      return register.mutate(user)
    }

    // if there's an invite, the process' a bit different
    return inviteSignup.mutate({
      code: invite.code,
      user,
    })
  }

  // normally registered accounts need verification
  if (register.isSuccess) {
    return <VerificationPending email={email} />
  }

  // accounts coming from invites don't need verification
  if (inviteSignup.isSuccess) {
    return <Navigate to={Routes.auth.signIn} />
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
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ md: 4 }}>
            <InputBasic formValue='firstName' label={t('signup_first_name')} placeholder={'John'} required />
            <InputBasic formValue='lastName' label={t('signup_last_name')} placeholder={'Doe'} required />
          </Flex>
          <InputBasic
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            validation={{
              required: t('form.error.field_is_required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex para validar emails
                message: t('form.error.email_invalid', { defaultValue: 'Invalid email address' }),
              },
            }}
            isDisabled={!!invite}
          />
          <InputPassword
            formValue='password'
            label={t('password')}
            placeholder={t('password_placeholder')}
            type='password'
            validation={{
              required: t('form.error.field_is_required'),
              minLength: {
                value: 8,
                message: t('form.error.password_min_length', { defaultValue: 'Min. 8 characters' }),
              },
            }}
          />

          <CustomCheckbox
            formValue='terms'
            label={
              <Trans
                i18nKey='signup_agree_terms'
                components={{
                  termsLink: <Link isExternal as={ReactRouterLink} to={Routes.terms} />,
                  privacyLink: <Link isExternal as={ReactRouterLink} to={Routes.privacy} />,
                }}
              />
            }
            required
          />

          <Button isLoading={isPending} type='submit' size='xl' w='100%'>
            {t('signup_create_account')}
          </Button>
        </Flex>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%'>
        <Text color='account.description' fontWeight='400' fontSize='sm'>
          {t('already_member')}
          <Link as={NavLink} to={Routes.auth.signIn} ml={1} fontWeight={500}>
            {t('signin')}
          </Link>
        </Text>
      </Flex>
      {isError && <FormSubmitMessage isError={isError} error={error} />}
    </>
  )
}
export default SignUp
