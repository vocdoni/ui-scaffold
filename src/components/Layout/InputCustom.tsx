export interface InputCustomProps {
  formValue: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  validation?: any
  messageError?: string
}
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

export interface InputCustomProps extends InputProps {
  formValue: string
  label: string
  validation?: any
  messageError?: string
}

const InputCustom = ({
  formValue,
  label,
  placeholder,
  type = 'text',
  required = false,
  validation = {},
}: InputCustomProps) => {
  const { t } = useTranslation()
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()
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
    <FormControl isInvalid={!!errors[formValue]}>
      {label && (
        <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' color={textColor} mb={2}>
          {label}
          {required && (
            <Text color={textColorBrand} ml={1}>
              *
            </Text>
          )}
        </FormLabel>
      )}
      <InputGroup size='md'>
        <Input {...register(formValue, validationRules)} type={inputType} placeholder={placeholder} />
        {type === 'password' && (
          <InputRightElement display='flex' alignItems='center' minH='100%'>
            <Icon
              color={textColorSecondary}
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

export default InputCustom
