import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import InputCustom from '../Layout/InputCustom'

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
    <Flex direction='column' gap={6}>
      <Box me='auto'>
        <Heading color={textColor} fontSize='4xl' mb={2.5}>
          {t('forgot_password_title')}
        </Heading>
        <Text color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('forgot_password_subtitle')}
        </Text>
      </Box>

      <FormProvider {...methods}>
        <Flex as='form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={6}>
          <InputCustom
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
            required
          />
          <Button type='submit' fontSize='sm' variant='brand' fontWeight='500' w='100%' h={50}>
            {t('forgot_password_reset_link')}
          </Button>
        </Flex>
      </FormProvider>
      <Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt={0}>
        <Text color={textColorSecondary} fontWeight='400' fontSize='sm'>
          {t('already_member')}
          <NavLink to='/account/signin'>
            <Text color={textColorBrand} as='span' ms={1} fontWeight='500'>
              {t('signin')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  )
}

export default ForgotPassword
