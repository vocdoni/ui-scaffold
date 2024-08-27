import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

function ForgotPassword() {
  const { textColor, textColorSecondary, textColorBrand } = useDarkMode()

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Forgot your password?
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          No problem. Just let us know your email address and we'll email you a password reset link that will allow you
          to choose a new one.
        </Text>
      </Box>

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

        <Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          Email password reset link
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

export default ForgotPassword
