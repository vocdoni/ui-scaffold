import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = defineStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      borderRadius: 6,
      border: '1px solid',
      borderColor: `${colorScheme}.200`,
      width: 'auto',
    },
  }
})

export const Tag = defineMultiStyleConfig({ baseStyle, defaultProps: { colorScheme: 'brand' } })
