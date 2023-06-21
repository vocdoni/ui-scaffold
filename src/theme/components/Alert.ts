import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme } = props

  if (colorScheme === 'info')
    return {
      container: {
        borderRadius: 'md',
        border: '1px solid',
        color: 'info.color',
      },
    }
  return {}
})

export const Alert = defineMultiStyleConfig({
  baseStyle,
})
