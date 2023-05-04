import { defineStyle } from '@chakra-ui/react'

export const Button = defineStyle({
  variants: {
    ghost: {
      _hover: {
        color: 'buttons.ghost_hover_color',
      },
    },
  },
})
