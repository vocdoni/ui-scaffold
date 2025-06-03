import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, SystemStyleObject } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface InputBasicProps extends InputProps {
  formValue: string
  label: string
  required?: boolean
  validation?: any
  messageError?: string
  labelStyles?: SystemStyleObject
}
const InputBasic = ({
  formValue,
  label,
  required = false,
  validation = {},
  labelStyles,
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
      {label && <FormLabel sx={labelStyles}>{label}</FormLabel>}
      <Input
        {...register(formValue, validationRules)}
        {...props}
        required={false} // we don't want HTML5 validation
      />
      <FormErrorMessage mt={2}>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default InputBasic
