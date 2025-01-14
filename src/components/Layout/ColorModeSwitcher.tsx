import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <IconButton
      variant='primary'
      colorScheme='gradient'
      marginLeft={2}
      size='md'
      fontSize='lg'
      color='white'
      onClick={toggleColorMode}
      borderRadius='full'
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
