import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink, Link as ReactRouterLink, useOutletContext } from 'react-router-dom'
import { IRegisterParams } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import { VerifyAccountNeeded } from '~components/Auth/Verify'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import InputPassword from '~components/Layout/InputPassword'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'
import CustomCheckbox from '../Layout/CheckboxCustom'
import { default as InputBasic } from '../Layout/InputBasic'
import GoogleAuth from './GoogleAuth'
import { HSeparator } from './SignIn'

type FormData = {
  terms: boolean
} & IRegisterParams

const SignUp = () => {
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  const {
    register: { mutateAsync: signup, isError, error, isPending },
  } = useAuth()

  const methods = useForm<FormData>()
  const { handleSubmit, watch } = methods
  const email = watch('email')

  // State to show signup is successful
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setTitle(t('signup_title'))
    setSubTitle(t('signup_subtitle'))
  }, [])

  const onSubmit = async (data: FormData) => {
    await signup(data).then(() => setIsSuccess(true))
  }

  if (isSuccess) {
    return <VerifyAccountNeeded email={email} />
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
            type='email'
            required
          />
          <InputPassword
            formValue='password'
            label={t('password')}
            placeholder={t('password_placeholder', { defaultValue: 'Min 8 characters' })}
            type='password'
            required
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

          <Button isLoading={isPending} type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h={50}>
            {t('signup_create_account')}
          </Button>
        </Flex>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%'>
        <Text color='account.description' fontWeight='400' fontSize='sm'>
          {t('already_member')}
          <NavLink to={Routes.auth.signIn}>
            <Text color={'account.link'} as='span' ms={1} fontWeight='500'>
              {t('signin')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
      {isError && <FormSubmitMessage isError={isError} error={error} />}
    </>
  )
}
export default SignUp
