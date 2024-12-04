import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      border: '1px solid',
      borderColor: `${colorScheme}.200`,
      width: 'auto',
      _dark: {
        borderColor: `${colorScheme}.300`,
      },
    },
  }
})

export const Tag = defineMultiStyleConfig({ baseStyle, defaultProps: { colorScheme: 'brand' } })
