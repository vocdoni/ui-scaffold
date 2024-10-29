import { FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'

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
      <InputGroup>
        <Input {...register(formValue, validationRules)} type={type} placeholder={placeholder} />
        {type === 'password' && (
          <InputRightElement display='flex' alignItems='center' minH='100%'>
            <Icon
              _hover={{ cursor: 'pointer' }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage mt={2}>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default InputBasic
