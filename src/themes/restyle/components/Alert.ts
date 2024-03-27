import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { status } = props

  const commonStyles = {
    borderRadius: 'xl',
    border: '1px solid',
    w: 'fit-content',
    mx: 'auto',
  }

  if (status === 'info')
    return {
      description: {
        whiteSpace: 'pre-line',
      },
      container: {
        ...commonStyles,
        color: 'process_create.alert_info.color',
        bgColor: 'process_create.alert_info.bg',

        '& span svg': {
          color: 'process_create.alert_info.color',
        },
      },
    }

  return {
    container: {
      ...commonStyles,
    },
  }
})

export const Alert = defineMultiStyleConfig({
  baseStyle,
})
