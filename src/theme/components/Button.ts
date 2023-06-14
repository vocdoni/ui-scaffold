import { defineStyle } from '@chakra-ui/react'

export const Button = defineStyle({
  variants: {
    link: {
      color: 'link',
      textDecoration: 'underline',

      _hover: {
        textDecoration: 'none',
      },
    },
    ghost: {
      _hover: {
        color: 'buttons.ghost_hover_color',
      },
    },
    vcd_green: {
      colorScheme: 'process_create.btn_vcd',

      _hover: {
        fontSize: 'lg',
      },
      _active: {
        fontSize: 'md',
      },
    },
  },
})
