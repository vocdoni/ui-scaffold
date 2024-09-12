import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const Password = ({ required, messageError }: { required?: any; messageError?: string }) => {
  const { t } = useTranslation()
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const req = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const validation = required ? required : { required: req }
  return (
    <FormControl isInvalid={!!errors.password} mb='24px'>
      <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} display='flex' mb='8px'>
        {t('password')}
        <Text color={textColorBrand}>*</Text>
      </FormLabel>
      <InputGroup size='md' mb='8px'>
        <Input
          fontSize='sm'
          placeholder='Min. 8 characters'
          size='lg'
          type={show ? 'text' : 'password'}
          variant='auth'
          {...register('password', validation)}
        />
        <InputRightElement display='flex' alignItems='center' mt='4px'>
          <Icon
            color={textColorSecondary}
            _hover={{ cursor: 'pointer' }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      {errors.password && errors.password.type === 'required' && (
        <FormErrorMessage>{t('form.error.field_is_required')}</FormErrorMessage>
      )}
      {errors.password && errors.password.type === 'minLength' && <FormErrorMessage>{messageError}</FormErrorMessage>}
    </FormControl>
  )
}

export default Password
