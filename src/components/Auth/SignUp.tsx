import { Box, Button, Flex, FormControl, FormErrorMessage, Heading, Link, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import CustomCheckbox from '../Layout/CheckboxCustom'
import InputCustom from '../Layout/InputCustom'
import GoogleAuth from './GoogleAuth'
import { HSeparator } from './SignIn'
import { useState } from 'react'
import { IRegisterParams } from '~components/Auth/authQueries'

type FormData = {
  terms: boolean
} & IRegisterParams

const SignUp = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()
  const {
    register: { mutateAsync: signup, isError, error, isPending },
  } = useAuth()

  const methods = useForm<FormData>()
  const { handleSubmit, watch } = methods
  const email = watch('email')

  // State to show signup is successful
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (data: FormData) => {
    await signup(data).then(() => setIsSuccess(true))
  }

  if (isSuccess) {
    return <AccountCreated email={email} />
  }

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('signup_title')}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('signup_subtitle')}
        </Text>
      </Box>
      <GoogleAuth />
      <Flex align='center' my='24px'>
        <HSeparator />
        <Text color='gray.400' mx='14px'>
          {t('or')}
        </Text>
        <HSeparator />
      </Flex>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ md: '15px' }}>
            <InputCustom formValue='firstName' label={t('signup_first_name')} placeholder={'John'} required />
            <InputCustom formValue='lastName' label={t('signup_last_name')} placeholder={'Doe'} required />
          </Flex>
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
                  termsLink: <Link as={ReactRouterLink} to='/terms' />,
                  privacyLink: <Link as={ReactRouterLink} to='/privacy' />,
                }}
              />
            }
            required
          />
          <Button
            isLoading={isPending}
            type='submit'
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'
          >
            {t('signup_create_account')}
          </Button>
        </Box>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          {t('already_member')}
          <NavLink to='/signin'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              {t('signin')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
      <Box pt={2}>
        <FormControl isInvalid={isError}>
          {isError && <FormErrorMessage>{error?.message || 'Error al realizar la operación'}</FormErrorMessage>}
        </FormControl>
      </Box>
    </Flex>
  )
}

const AccountCreated = ({ email }: { email: string }) => {
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()
  const { t } = useTranslation()
  if (import.meta.env.NODE_ENV === 'dev') {
  }

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('signup.account_created_succesfully', { defaultValue: 'Account created successfully!' })}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('signup.verification_email_is_sent', {
            defaultValue: 'A verification email has been sent to:',
          })}
        </Text>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='bold' fontSize='md'>
          {email}
        </Text>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('signup.follow_email_instructions', {
            defaultValue: 'Follow the instructions there to activate your account.',
          })}
        </Text>
        {import.meta.env.VOCDONI_ENVIRONMENT === 'dev' && (
          <Button as={ReactRouterLink} to={`/account/verify?email=${email}&code=`}>
            Mail verification for dev envs
          </Button>
        )}
      </Box>
    </Flex>
  )
}

export default SignUp
