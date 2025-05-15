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
    _focus: {
      bg: 'whitesmoke',
    },
  },

  divider: {
    m: 0,
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle })
