import { Icon, IconButton, IconButtonProps, MenuItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { Trans } from 'react-i18next'
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

export const DropdownColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode()
  const isLightMode = useColorModeValue(true, false)
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <MenuItem onClick={toggleColorMode} closeOnSelect={true} {...props}>
      <Icon as={SwitchIcon} />
      {!isLightMode ? <Trans i18nKey='light_mode'>Light mode</Trans> : <Trans i18nKey='dark_mode'>Dark mode</Trans>}
    </MenuItem>
  )
}
