import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = (props: any) => {
  const { status } = props

  const statusColorMap = {
    info: 'var(--chakra-colors-alert-info)',
    success: 'var(--chakra-colors-alert-success)',
    error: 'var(--chakra-colors-alert-error)',
    warning: 'var(--chakra-colors-alert-warning)',
  }

  const color = statusColorMap[status] || statusColorMap['info']

  return {
    container: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', lg: 'fit-content(50px) 1fr' },
      gridColumnGap: 2,
      border: '1px solid',
      borderColor: 'alert.border',
      borderRadius: 'lg',
      width: 'fit-content',
      bgColor: 'alert.bg.light',
      _dark: {
        bgColor: 'alert.bg.dark',
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
      boxShadow: `0 0 0px 1px var(--chakra-colors-alert-box_shadow_light), 0 0 0px 2px  ${color}, 0 0 0 4px var(--chakra-colors-alert-box_shadow_light), 0 0 1px 5px ${color}`,
      borderRadius: 'lg',
      _dark: {
        boxShadow: `0 0 0px 1px var(--chakra-colors-alert-box_shadow_dark), 0 0 0px 2px ${color}, 0 0 0 4px var(--chakra-colors-alert-box_shadow_dark), 0 0 1px 5px ${color}`,
      },
      w: 4,
      h: 4,
    },
  }
}

export const Alert = defineMultiStyleConfig({ baseStyle })
