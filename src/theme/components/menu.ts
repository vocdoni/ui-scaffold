import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    p: 0,
    borderRadius: 'lg',
    overflow: 'hidden',
    boxShadow: 'lg',
  },
  item: {
    px: 4,
    py: 2.5,
    display: 'flex',
    gap: 2,
    fontWeight: 600,
  },

  divider: {
    m: 0,
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle })
