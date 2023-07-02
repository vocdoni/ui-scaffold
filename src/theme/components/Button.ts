import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const dropdown = {
  color: 'black',
  borderRadius: 'none',
  w: 'full',

  _hover: {
    bgColor: 'navbar.btn_list.hover',
  },

  _active: {
    bgColor: 'navbar.btn_list.active',
  },
}

const ghost = {
  _hover: {
    color: 'buttons.ghost_hover_color',
  },
}

const link = defineStyle({
  color: 'link',
  textDecoration: 'underline',

  _hover: {
    textDecoration: 'none',
  },
})

export const Button = defineStyleConfig({
  variants: { dropdown, ghost, link },
})
