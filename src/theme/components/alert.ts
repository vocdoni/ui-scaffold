import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, useColorMode } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = (props: any) => {
  const { status } = props
  const colorMode = useColorMode()
  const lightMode = colorMode.colorMode === 'light'

  const statusColorMap = {
    info: lightMode ? 'var(--chakra-colors-alert-info-light)' : 'var(--chakra-colors-alert-info-dark)',
    success: lightMode ? 'var(--chakra-colors-alert-success-light)' : 'var(--chakra-colors-alert-success-dark)',
    error: lightMode ? 'var(--chakra-colors-alert-error-light)' : 'var(--chakra-colors-alert-error-dark)',
    warning: lightMode ? 'var(--chakra-colors-alert-warning-light)' : 'var(--chakra-colors-alert-warning-dark)',
  }

  const color = statusColorMap[status] || statusColorMap['info']

  return {
    container: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', lg: 'fit-content(50px) 1fr' },
      border: '1px solid',
      borderColor: 'alert.border.light',
      borderRadius: 'lg',
      width: 'fit-content',
      bgColor: 'alert.bg.light',
      _dark: {
        bgColor: 'alert.bg.dark',
        borderColor: 'alert.border.dark',
      },
    },
    title: {
      gridColumn: { lg: 2 },
      color: 'alert.color.light',
      _dark: {
        color: 'alert.color.dark',
      },
    },
    description: {
      gridColumn: { lg: 2 },
      color: 'alert.color.light',
      _dark: {
        color: 'alert.color.dark',
      },
    },
    icon: {
      color,
      w: 6,
      h: 6,
    },
  }
}

export const Alert = defineMultiStyleConfig({ baseStyle })
