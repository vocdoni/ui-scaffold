import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const Email = ({ label }: { label?: string }) => {
  const { t } = useTranslation()
  const { textColor, textColorBrand } = useDarkMode()

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  return (
    <FormControl isInvalid={!!errors.email} mb='24px'>
      <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
        {label ? label : t('email')}
        <Text color={textColorBrand}>*</Text>
      </FormLabel>
      <Input type='email' placeholder='your@email.com' {...register('email', { required })} />
      <FormErrorMessage>{errors.email?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export default Email
