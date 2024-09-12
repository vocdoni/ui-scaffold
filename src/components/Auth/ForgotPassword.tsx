import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import Email from './Email'

function ForgotPassword() {
  const { t } = useTranslation()
  const { textColor, textColorSecondary, textColorBrand } = useDarkMode()
  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = () => {}

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('forgot_password_title')}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('forgot_password_subtitle')}
        </Text>
      </Box>

      <FormProvider {...methods}>
        <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
          <Email />
          <Button type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
            {t('forgot_password_reset_link')}
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
    </Flex>
  )
}

export default ForgotPassword
