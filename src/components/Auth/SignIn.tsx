import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

function SignIn() {
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('auth.signin_title')}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('auth.signin_subtitle')}
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
        {t('auth.signin_google')}
      </Button>
      <Flex align='center' mb='25px'>
        <HSeparator />
        <Text color='gray.400' mx='14px'>
          {t('auth.or')}
        </Text>
        <HSeparator />
      </Flex>
      <FormControl>
        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
          {t('auth.email')}
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
        />
        <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} display='flex'>
          {t('auth.password')}
          <Text color={textColorBrand}>*</Text>
        </FormLabel>
        <InputGroup size='md'>
          <Input
            isRequired={true}
            fontSize='sm'
            placeholder='Min. 8 characters'
            mb='24px'
            size='lg'
            type={show ? 'text' : 'password'}
            variant='auth'
          />
          <InputRightElement display='flex' alignItems='center' mt='4px'>
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: 'pointer' }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
        <Flex justifyContent='space-between' align='center' mb='24px'>
          <FormControl display='flex' alignItems='center'>
            <Checkbox id='remember-login' colorScheme='brandScheme' me='10px' />
            <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
              {t('auth.keep_me_logged')}
            </FormLabel>
          </FormControl>
          <NavLink to='/auth/forgot-password'>
            <Text color={textColorBrand} fontSize='sm' w='124px' fontWeight='500'>
              {t('auth.forgot_password')}
            </Text>
          </NavLink>
        </Flex>
        <Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          {t('auth.signin')}
        </Button>
      </FormControl>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          {t('auth.not_registred_yet')}
          <NavLink to='/auth/signup'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              {t('auth.create_account')}
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
