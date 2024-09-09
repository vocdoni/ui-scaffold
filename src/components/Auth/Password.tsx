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

const Password = () => {
  const { t } = useTranslation()
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
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
          {...register('password', { required })}
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
      <FormErrorMessage>{errors.password?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export default Password
