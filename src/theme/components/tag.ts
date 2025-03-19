import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      display: 'inline-flex',
      justifyContent: 'center',
      padding: '6px 15px',
    },
  }
})

const solid = definePartsStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      bgColor: `${colorScheme}.500`,
      color: 'white !important',
      _dark: {
        bgColor: `${colorScheme}.200`,
        color: 'black !important',

        _hover: {
          color: 'black !important',
        },
      },
    },
  }
})

export const Tag = defineMultiStyleConfig({
  baseStyle,
  variants: {
    solid,
  },
  defaultProps: { colorScheme: 'brand', variant: 'solid' },
})
