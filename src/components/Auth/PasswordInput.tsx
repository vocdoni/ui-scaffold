import { Icon, IconProps, Input, InputGroup, InputGroupProps, InputProps, InputRightElement } from '@chakra-ui/react'
import { RiEyeCloseLine } from 'react-icons/ri'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import React from 'react'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const PasswordInput = ({
  inputGroup,
  input,
  icon,
}: {
  inputGroup?: InputGroupProps
  input?: InputProps
  icon?: IconProps
}) => {
  const { textColorSecondary } = useDarkMode()
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)
  return (
    <InputGroup size='md' {...inputGroup}>
      <Input {...input} type={show ? 'text' : 'password'} />
      <InputRightElement display='flex' alignItems='center' mt='4px'>
        <Icon
          color={textColorSecondary}
          {...icon}
          _hover={{ cursor: 'pointer' }}
          as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
