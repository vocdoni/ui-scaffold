import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import Email from './Email'
import GoogleAuth from './GoogleAuth'
import Password from './Password'

function SignIn() {
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit = () => {
    console.log('send')
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
          <Email />
          <Password />
          <Flex justifyContent='space-between' align='center' mb='24px'>
            <FormControl display='flex' alignItems='center'>
              <Checkbox {...register('remember')} id='remember-login' colorScheme='brandScheme' me='10px' />
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
    </Flex>
  )
}

export const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex h='1px' w='100%' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export const VSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props
  return <Flex w='1px' bg='rgba(135, 140, 189, 0.3)' {...rest} />
}

export default SignIn
