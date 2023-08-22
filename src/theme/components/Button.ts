import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const process = defineStyle({
  w: 'full',
  color: 'process.results.aside.vote_btn_color',
  mb: 4,
  borderRadius: 30,
  p: 7,
  bgColor: 'process.results.aside.vote_btn_bg',
})

export const Button = defineStyleConfig({
  variants: { process },
})
