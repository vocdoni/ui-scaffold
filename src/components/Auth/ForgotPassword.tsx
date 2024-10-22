import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useOutletContext } from 'react-router-dom'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import InputCustom from '../Layout/InputCustom'

function ForgotPassword() {
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    setTitle(t('forgot_password_title'))
    setSubTitle(t('forgot_password_subtitle'))
  }, [])

  const onSubmit = () => {}

  return (
    <>
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
        <Text fontWeight='400' fontSize='sm'>
          {t('already_member')}
          <NavLink to='/account/signin'>
            <Text as='span' color={'account.link'} ms={1} fontWeight='500'>
              {t('signin')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </>
  )
}

export default ForgotPassword
