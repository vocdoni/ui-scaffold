import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink, Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { IRegisterParameters } from '~components/Auth/useAuthProvider'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import Email from './Email'
import GoogleAuth from './GoogleAuth'
import Password from './Password'
import { HSeparator } from './SignIn'

type FormData = {
  terms: boolean
} & IRegisterParameters

const SignUp = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()
  const {
    register: { mutateAsync: signup, isError, error, isPending },
  } = useAuth()

  const methods = useForm<FormData>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: FormData) => {
    await signup(data).then(() => navigate('/organization'))
  }

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const passwordValidation = { required: true, minLength: 8 }

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
            <FormControl isInvalid={!!errors.firstName} flexGrow={1} mb='24px'>
              <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                {t('signup_first_name')}
                <Text color={textColorBrand}>*</Text>
              </FormLabel>
              <Input
                {...register('firstName', { required })}
                variant='auth'
                fontSize='sm'
                ms={{ base: '0px', md: '0px' }}
                type='text'
                placeholder='First Name'
                fontWeight='500'
                size='lg'
              />
              <FormErrorMessage>{errors.firstName?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} flexGrow={1} mb='24px'>
              <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                {t('signup_last_name')}
                <Text color={textColorBrand}>*</Text>
              </FormLabel>
              <Input
                {...register('lastName', { required })}
                variant='auth'
                fontSize='sm'
                ms={{ base: '0px', md: '0px' }}
                type='text'
                placeholder='Last Name'
                fontWeight='500'
                size='lg'
              />
              <FormErrorMessage>{errors.lastName?.message?.toString()}</FormErrorMessage>
            </FormControl>
          </Flex>

          <Email />
          <Password required={passwordValidation} messageError='At least 8 characters' />

          <FormControl isInvalid={!!errors.terms} mb='24px'>
            <Flex alignItems='start'>
              <Checkbox
                {...register('terms', { required })}
                id='remember-login'
                colorScheme='brandScheme'
                me='10px'
                mt='4px'
              />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
                <Trans
                  i18nKey='signup_agree_terms'
                  components={{
                    termsLink: <Link as={ReactRouterLink} to='/terms' />,
                    privacyLink: <Link as={ReactRouterLink} to='/privacy' />,
                  }}
                />
              </FormLabel>
            </Flex>
            <FormErrorMessage>{errors.terms?.message?.toString()}</FormErrorMessage>
          </FormControl>
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

export default SignUp
