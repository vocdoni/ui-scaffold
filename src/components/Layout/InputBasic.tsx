import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface InputBasicProps extends InputProps {
  formValue: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  validation?: any
  messageError?: string
}
const InputBasic = ({
  formValue,
  label,
  placeholder,
  type = 'text',
  required = false,
  validation = {},
  ...props
}: InputBasicProps) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const validationRules = {
    ...validation,
    ...(required ? { required: { value: true, message: t('form.error.field_is_required') } } : {}),
  }

  const errorMessage = errors[formValue]?.message?.toString() || ''

  return (
    <FormControl isInvalid={!!errors[formValue]} isRequired={required}>
      {label && <FormLabel variant='process-create-title-sm'>{label}</FormLabel>}
      <Input {...register(formValue, validationRules)} type={type} placeholder={placeholder} {...props} />
      <FormErrorMessage mt={2}>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default InputBasic
