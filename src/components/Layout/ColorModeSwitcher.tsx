import { Icon, IconButton, IconButtonProps, MenuItem, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <IconButton
      variant='ghost'
      size='md'
      fontSize='lg'
      bg='linear-gradient(135deg, #B5F492 0%, #338B93 100%)'
      color='current'
      onClick={toggleColorMode}
      borderRadius='full'
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

export const DropdownColorModeSwitcher = ({ ...props }) => {
  const { t } = useTranslation()
  const { toggleColorMode } = useColorMode()
  const isLightMode = useColorModeValue(true, false)
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <MenuItem onClick={toggleColorMode} {...props}>
      <Icon as={SwitchIcon} />
      <Text as='span'>{isLightMode ? t('dark_mode') : t('light_mode')}</Text>
    </MenuItem>
  )
}
