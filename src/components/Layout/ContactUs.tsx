import { Box, Button, Flex, FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiMapPin, FiPhone } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import CustomCheckbox from '../Layout/CheckboxCustom'
import InputBasic from './InputBasic'
import Wrapper from './Wrapper'

const ContactUs = () => {
  const { t } = useTranslation()

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      privacy: false,
    },
  })
  return (
    <Wrapper display='flex' flexDirection={{ base: 'column', lg: 'row' }} gap={8} py={10}>
      <Box flex={'1 1 50%'}>
        <Text mb={4}>{t('contact_us.title', { defaultValue: 'Contact Us' })}</Text>
        <Text mb={6}>
          {t('contact_us.description', { defaultValue: 'Our friendly team would love to hear from you' })}
        </Text>
        <Flex flexDirection={'column'} gap={2}>
          <Flex alignItems='center' gap={2}>
            <MdOutlineMailOutline />
            <Text mb={0}>{t('contact_us.email', { defaultValue: 'hello@vocdoni.org' })}</Text>
          </Flex>
          <Flex alignItems='center' gap={2}>
            <FiPhone />
            <Text>{t('contact_us.phone', { defaultValue: '@vocdoni_community (TG)' })}</Text>
          </Flex>
          <Flex alignItems='center' gap={2}>
            <FiMapPin />
            <Text>{t('contact_us.location', { defaultValue: '@vocdoni' })}</Text>
          </Flex>
        </Flex>
      </Box>
      <FormProvider {...methods}>
        <Flex as='form' flex={'1 1 50%'} flexDirection={'column'} gap={6}>
          <InputBasic
            formValue='name'
            label={t('name', { defaultValue: 'Name' })}
            placeholder={t('name_placeholder', { defaultValue: 'Your name' })}
            type='text'
            required
          />
          <InputBasic
            formValue='email'
            label={t('email')}
            placeholder={t('email_placeholder', { defaultValue: 'your@email.com' })}
            type='email'
            required
          />
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500'>
              {t('contact_us.message.label', { defaultValue: 'Message' })}
            </FormLabel>
            <Textarea
              {...methods.register('message')}
              placeholder={t('contact_us.message.placeholder', { defaultValue: 'Type yout message' })}
              isRequired
            />
          </FormControl>
          <CustomCheckbox
            formValue='privacy'
            label={t('contact_us.privacy_policy', { defaultValue: 'You agree to our friendly privacy policy' })}
          />

          <Button type='submit'>{t('submit', { defaultValue: 'Submit' })}</Button>
        </Flex>
      </FormProvider>
    </Wrapper>
  )
}

export default ContactUs
