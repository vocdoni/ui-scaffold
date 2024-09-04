import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

function ForgotPassword() {
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand } = useDarkMode()

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          Forgot your password?
          {t('auth.forgot_password_title')}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('auth.forgot_password_title')}
        </Text>
      </Box>

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

        <Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
          {t('auth.forgot_password_reset_link')}
        </Button>
      </FormControl>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
        <Text color={textColorSecondary} fontWeight='400' fontSize='14px'>
          {t('auth.already_member')}
          <NavLink to='/auth/signin'>
            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
              {t('auth.signin')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  )
}

export default ForgotPassword
