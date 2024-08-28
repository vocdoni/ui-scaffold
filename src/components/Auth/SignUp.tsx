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
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { HSeparator } from './SignIn'

function SignUp() {
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Sign Up
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          Enter your email and password to sign up!
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
        Sign in with Google
      </Button>
      <Flex align='center' mb='25px'>
        <HSeparator />
        <Text color='gray.400' mx='14px'>
          or
        </Text>
        <HSeparator />
      </Flex>
      <FormControl>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ md: '15px' }}>
          <Box flexGrow={1}>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              First Name<Text color={textColorBrand}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: '0px', md: '0px' }}
              type='email'
              placeholder='First Name'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
          </Box>
          <Box flexGrow={1}>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              Last Name<Text color={textColorBrand}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: '0px', md: '0px' }}
              type='email'
              placeholder='Last Name'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
          </Box>
        </Flex>
        <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
          Email<Text color={textColorBrand}>*</Text>
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
          Password<Text color={textColorBrand}>*</Text>
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
        <FormControl display='flex' alignItems='start' mb='24px'>
          <Checkbox id='remember-login' colorScheme='brandScheme' me='10px' mt='4px' />
          <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
            By creating an account means you agree to the Terms and Conditions, and our Privacy Policy
          </FormLabel>
        </FormControl>
        <Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          Create my account
        </Button>
      </FormControl>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          Already a member?
          <NavLink to='/auth/signin'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              Sign in
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  )
}

export default SignUp