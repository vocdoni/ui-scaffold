import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'
import PasswordInput from '~components/Auth/PasswordInput'
import { useAuth } from '~components/Auth/useAuth'
import { ILoginParameters } from '~components/Auth/useAuthProvider'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

type FormData = {
  keepLogedIn: boolean
} & ILoginParameters

const SignIn = () => {
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const {
    login: { mutate: login, isError, error, isPending },
  } = useAuth()

  const onSubmit = (data: FormData) => {
    login(data)
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
      <Button
        fontSize='sm'
        bg={googleBg}
        color={textColor}
        fontWeight='500'
        _hover={googleHover}
        _active={googleActive}
        _focus={googleActive}
      >
        <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
        {t('signin_google')}
      </Button>
      <Flex align='center' mb='25px'>
        <HSeparator />
        <Text color='gray.400' mx='14px'>
          {t('or')}
        </Text>
        <HSeparator />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
            {t('email')}
            <Text color={textColorBrand}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant='auth'
            fontSize='sm'
            ms={{ base: '0px', md: '0px' }}
            type='email'
            placeholder='mail@simmmple.com'
            mb='24px'
            fontWeight='500'
            size='lg'
            {...register('email', {
              required: 'Email is required',
            })}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} display='flex'>
            {t('password')}
            <Text color={textColorBrand}>*</Text>          </FormLabel>
          <PasswordInput
            input={{
              isRequired: true,
              fontSize: 'sm',
              placeholder: 'Password',
              mb: '24px',
              size: 'lg',
              variant: 'auth',
              ...register('password', {
                required: 'Password is required',
              }),
            }}
          />
        </FormControl>
        <Flex justifyContent='space-between' align='center' mb='24px'>
          <FormControl display='flex' alignItems='center'>
            <Checkbox id='remember-login' colorScheme='brandScheme' me='10px' {...register('keepLogedIn')} />
            <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
              {t('keep_me_logged')}
            </FormLabel>
          </FormControl>
          <NavLink to='/auth/forgot-password'>
            <Text color={textColorBrand} fontSize='sm' w='124px' fontWeight='500'>
              {t('forgot_password')}
            </Text>
          </NavLink>
        </Flex>
        <Button type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          {t('signin')}
        </Button>
      </form>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          {t('not_registred_yet')}
          <NavLink to='/auth/signup'>
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
