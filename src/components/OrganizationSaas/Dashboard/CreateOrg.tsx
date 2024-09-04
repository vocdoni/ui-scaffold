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
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

function CreateOrg() {
  const { textColor, textColorSecondary, textColorBrand, googleBg, googleHover, googleActive } = useDarkMode()

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Sign In
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          Enter your email and password to sign in!
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
        <Flex justifyContent='space-between' align='center' mb='24px'>
          <FormControl display='flex' alignItems='center'>
            <Checkbox id='remember-login' colorScheme='brandScheme' me='10px' />
            <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
              Keep me logged in
            </FormLabel>
          </FormControl>
          <NavLink to='/auth/forgot-password'>
            <Text color={textColorBrand} fontSize='sm' w='124px' fontWeight='500'>
              Forgot password?
            </Text>
          </NavLink>
        </Flex>
        <Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          Sign In
        </Button>
      </FormControl>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          Not registered yet?
          <NavLink to='/auth/signup'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              Create an Account
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  )
}

export const Footer = () => {
  let textColor = useColorModeValue('black', 'white')
  return (
    <Flex zIndex='3' flexDirection='column' alignItems='center' justifyContent='center' color={textColor} pb={5}>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link fontWeight='500' color={textColor} href='mailto:hello@simmmple.com'>
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link fontWeight='500' color={textColor} href='https://simmmple.com/terms-of-service'>
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight='500' color={textColor} href='https://www.blog.simmmple.com/'>
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  )
}

export default CreateOrg
