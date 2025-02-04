import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      padding: '6px 15px',

      _dark: {
        borderColor: `${colorScheme}.300`,
      },
    },
  }
})

export const Tag = defineMultiStyleConfig({
  baseStyle,
  defaultProps: { colorScheme: 'brand' },
})
