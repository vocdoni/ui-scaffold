import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const dropdown = {
  color: 'black',
  borderRadius: 'none',
  w: 'full',

  _hover: {
    bgColor: 'button.dropdown.hover',
  },

  _active: {
    bgColor: 'button.dropdown.active',
  },
}

const ghost = {
  h: 8,
  maxW: 30,
  py: 2,
  px: 2,
  border: '1px solid',
  bgColor: 'process.header.btn_bg',
  color: 'process.header.btn_color',
  borderRadius: 18,

  _hover: {
    color: 'process.header.btn_color',
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
