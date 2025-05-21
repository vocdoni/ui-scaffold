import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    p: 1,
    borderRadius: 'sm',
    boxShadow: 'md',
  },
  item: {
    _selected: {
      bg: 'gray.200',
      color: 'black',
    },
    _focus: {
      bg: 'gray.100',
      color: 'black',
    },
  },

  divider: {
    m: 0,
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle })
