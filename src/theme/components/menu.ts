import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  list: {
    p: 1,
    borderRadius: 'sm',
    boxShadow: 'md',
    bg: props.colorMode === 'dark' ? 'black.800' : 'white',
  },
  item: {
    bg: props.colorMode === 'dark' ? 'black.800' : 'white',
    _selected: {
      bg: props.colorMode === 'dark' ? 'black.650' : 'gray.100',
      color: props.colorMode === 'dark' ? 'white' : 'black',
    },
    _focus: {
      bg: props.colorMode === 'dark' ? 'black.700' : 'gray.100',
      color: props.colorMode === 'dark' ? 'white' : 'black',
    },
  },

  divider: {
    m: 0,
  },
}))

export const Menu = defineMultiStyleConfig({ baseStyle })
