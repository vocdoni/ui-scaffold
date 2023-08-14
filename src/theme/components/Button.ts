import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const dropdown = defineStyle({
  borderRadius: 'none',
  w: 'full',

  _hover: {
    bgColor: 'button.drop_down.hover',
  },

  _active: {
    bgColor: 'button.drop_down.active',
  },
})
const process = defineStyle({
  w: 'full',
  color: 'process.results.aside.vote_btn_color',
  mb: 4,
  borderRadius: 30,
  p: 7,
  bgColor: 'process.results.aside.vote_btn_bg',
})

export const Button = defineStyleConfig({
  variants: { dropdown, process },
})
