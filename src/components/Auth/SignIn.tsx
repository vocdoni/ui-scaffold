import { Box, Button, Flex, FormControl, FormErrorMessage, Heading, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import CustomCheckbox from '../Layout/CheckboxCustom'
import InputCustom from '../Layout/InputCustom'
import GoogleAuth from './GoogleAuth'
import { ILoginParams } from '~components/Auth/authQueries'
import { UnverifiedApiError } from '~components/Auth/api'
import { useState } from 'react'
import { VerifyAccountNeeded } from '~components/Auth/Verify'

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
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('signin_title')}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('signin_subtitle')}
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
          <Flex justifyContent='center' align='center' mb='24px'>
            <CustomCheckbox formValue='keepLogedIn' label={t('keep_me_logged', { defaultValue: 'Kepp me logged' })} />

            <NavLink to='/auth/forgot-password'>
              <Text color={textColorBrand} fontSize='sm' w='124px' fontWeight='500'>
                {t('forgot_password')}
              </Text>
            </NavLink>
          </Flex>
          <Button type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
            {t('signin')}
          </Button>
        </Box>
      </FormProvider>

      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text fontWeight='400' fontSize='14px'>
          {t('not_registred_yet')}
          <NavLink to='/signup'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              {t('create_account')}
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

export const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex h='1px' w='100%' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export default SignIn
