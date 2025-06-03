import { FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'

export interface InputPasswordProps {
  formValue: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  validation?: any
  messageError?: string
}
const InputPassword = ({
  formValue,
  label,
  placeholder,
  type = 'password',
  required = false,
  validation = {},
}: InputPasswordProps) => {
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

  let inputType = type

  if (type === 'password' && show) {
    inputType = 'text'
  }

  return (
    <FormControl isInvalid={!!errors[formValue]} isRequired={required}>
      {label && <FormLabel variant='process-create-title-sm'>{label}</FormLabel>}
      <InputGroup>
        <Input {...register(formValue, validationRules)} type={inputType} placeholder={placeholder} required={false} />
        <InputRightElement display='flex' alignItems='center' minH='100%'>
          <Icon
            _hover={{ cursor: 'pointer' }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage mt={2}>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default InputPassword
