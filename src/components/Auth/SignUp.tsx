import { Button, Checkbox, Flex, FormControl, FormErrorMessage, Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, NavLink, Link as ReactRouterLink, useOutletContext } from 'react-router-dom'
import { IRegisterParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import InputPassword from '~components/Layout/InputPassword'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { useSignupFromInvite } from '~src/queries/account'
import { Routes } from '~src/router/routes'
import { default as InputBasic } from '../Layout/InputBasic'
import GoogleAuth from './GoogleAuth'
import { OrSeparator } from './SignIn'

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
  promotions: boolean
} & IRegisterParams

const SignUp = ({ invite }: SignupProps) => {
  const { t } = useTranslation()
  const { register: signup } = useAuth()
  const inviteSignup = useSignupFromInvite(invite?.address)
  const { setTitle, setSubtitle } = useOutletContext<AuthOutletContextType>()

  const methods = useForm<FormData>({
    defaultValues: {
      terms: false,
      email: invite?.email,
    },
  })
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods
  const email = watch('email')
  const password = watch('password')

  const isPending = signup.isPending || inviteSignup.isPending
  const isError = signup.isError || inviteSignup.isError
  const error = signup.error || inviteSignup.error

  useEffect(() => {
    // set SignUp title and description
    setTitle(t('signup_title'))
    setSubtitle(t('signup_subtitle'))
    signup.reset()
  }, [])

  const onSubmit = (user: FormData) => {
    if (!invite) {
      return signup.mutate(user)
    }

    // if there's an invite, the process' a bit different
    return inviteSignup.mutate({
      code: invite.code,
      user,
    })
  }

  // normally registered accounts need verification
  if (signup.isSuccess) {
    signup.reset()
    return <Navigate to={`${Routes.auth.verify}?email=${encodeURIComponent(email)}`} />
  }

  // accounts coming from invites don't need verification
  if (inviteSignup.isSuccess) {
    return <Navigate to={Routes.auth.signIn} />
  }

  return (
    <>
      <FormProvider {...methods}>
        <Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDirection='column' gap={6}>
          <Flex flexDirection={'column'} gap={4} mb={4}>
            <InputBasic formValue='firstName' label={t('signup_name')} placeholder={'John Doe'} />
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
              placeholder={'• • • • • • • •'}
              type='password'
              validation={{
                required: t('form.error.field_is_required'),
                minLength: {
                  value: 8,
                  message: t('form.error.password_min_length', { defaultValue: 'Min. 8 characters' }),
                },
              }}
            />
            <InputPassword
              formValue='confirm_password'
              label={t('confirm_password')}
              placeholder={'• • • • • • • •'}
              type='password'
              validation={{
                required: t('form.error.field_is_required'),
                validate: (value) => value === password || t('passwords_do_not_match'),
              }}
            />
            <FormControl as='fieldset' isInvalid={!!errors?.terms}>
              <Checkbox
                {...register('terms', { required: t('cc.validation.required') })}
                color='auth.checkboxes_text'
                isRequired
              >
                <Text fontSize={'14px'}>
                  <Trans
                    i18nKey='signup_agree_terms'
                    components={{
                      termsLink: (
                        <Link
                          isExternal
                          as={ReactRouterLink}
                          to={Routes.terms}
                          color={'auth.checkboxes_text'}
                          fontSize={'14px'}
                        />
                      ),
                      privacyLink: (
                        <Link
                          isExternal
                          as={ReactRouterLink}
                          to={Routes.privacy}
                          color={'auth.checkboxes_text'}
                          fontSize={'14px'}
                        />
                      ),
                    }}
                  ></Trans>
                </Text>
              </Checkbox>
              <FormErrorMessage>{errors?.terms?.message.toString()}</FormErrorMessage>
            </FormControl>
            <FormControl as='fieldset'>
              <Checkbox {...register('promotions')} color='auth.checkboxes_text'>
                <Text fontSize={'14px'}>
                  <Trans
                    i18nKey='signup_agree_promotions'
                    defaultValue='I agree to receive promotions and offers for digital voting services offered by Vocdoni.'
                  ></Trans>
                </Text>
              </Checkbox>
              <FormErrorMessage>{errors?.terms?.message.toString()}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Button isLoading={isPending} type='submit' w='100%' variant='primary'>
            {t('signup_create_account')}
          </Button>
          <OrSeparator />
        </Flex>
      </FormProvider>

      <GoogleAuth />

      <Text
        color='account.description'
        display={'flex'}
        justifyContent='center'
        alignItems='start'
        maxW='100%'
        mt={6}
        fontSize='sm'
        fontWeight={'bold'}
      >
        {t('already_member')}
        <Link as={NavLink} to={Routes.auth.signIn} ml={1} fontWeight={'bold'} variant={'unstyled'} fontSize='sm'>
          {t('signin')}
        </Link>
      </Text>
      {isError && <FormSubmitMessage isError={isError} error={error} />}
    </>
  )
}
export default SignUp
