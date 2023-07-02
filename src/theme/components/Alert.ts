import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { status } = props

  if (status === 'info')
    return {
      container: {
        borderRadius: 'md',
        border: '1px solid',
        color: 'process_create.alert_info.color',
        bgColor: 'process_create.alert_info.bg',

        '& span svg': {
          color: 'process_create.alert_info.color',
        },
      },
    }
  return {}
})

export const Alert = defineMultiStyleConfig({
  baseStyle,
})
