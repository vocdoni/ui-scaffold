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
    icon: {
      color,
      w: 6,
      h: 6,
    },
  }
}

export const Alert = defineMultiStyleConfig({ baseStyle })
