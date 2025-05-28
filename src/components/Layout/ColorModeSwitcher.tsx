import {
  ButtonGroup,
  ButtonGroupProps,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <IconButton
      colorScheme='gray'
      size='md'
      fontSize='lg'
      onClick={toggleColorMode}
      borderRadius='full'
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

type Mode = 'light' | 'dark' | 'system'

export const ThemeToggleGroup = (props: ButtonGroupProps) => {
  const { setColorMode } = useColorMode()
  const [selected, setSelected] = useState<Mode>(() => {
    return (localStorage.getItem('theme-preference') as Mode) || 'system'
  })
  const { t } = useTranslation()

  // Effect to "properly" handle system color mode changes
  useEffect(() => {
    if (selected === 'system') {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setColorMode(systemMode)
    } else {
      setColorMode(selected)
    }
    localStorage.setItem('theme-preference', selected)
  }, [selected, setColorMode])

  const iconBg = useColorModeValue('gray.100', 'gray.700')

  const modes: { mode: Mode; label: string; icon: IconType }[] = [
    { mode: 'system', label: t('system', 'System'), icon: LuMonitor },
    { mode: 'light', label: t('light', 'Light'), icon: LuSun },
    { mode: 'dark', label: t('dark', 'Dark'), icon: LuMoon },
  ]

  return (
    <ButtonGroup
      variant='outline'
      aria-label={t('color_mode_switcher', 'Color mode switcher')}
      {...props}
      border='1px solid'
      borderColor='table.border'
      borderRadius='sm'
      p={1}
    >
      {modes.map(({ mode, label, icon }) => (
        <Tooltip key={mode} label={label}>
          <IconButton
            aria-label={label}
            icon={<Icon as={icon} boxSize={4} />}
            onClick={() => setSelected(mode)}
            isActive={selected === mode}
            bg={selected === mode ? iconBg : undefined}
            variant='ghost'
            borderRadius='sm'
            size='xs'
          />
        </Tooltip>
      ))}
    </ButtonGroup>
  )
}
