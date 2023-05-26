import { defineStyle } from '@chakra-ui/react'

export const Button = defineStyle({
  variants: {
    ghost: {
      _hover: {
        color: 'buttons.ghost_hover_color',
      },
    },
    dropdown: {
      color: 'black',
      borderRadius: 'none',
      w: 'full',

      _hover: {
        bgColor: 'navbar.btn_list.hover',
      },

      _active: {
        bgColor: 'navbar.btn_list.active',
      },
    },
  },
})
