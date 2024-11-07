import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface InputBasicProps {
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
}: InputBasicProps) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

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
      <Input {...register(formValue, validationRules)} type={type} placeholder={placeholder} />
      <FormErrorMessage mt={2}>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default InputBasic
