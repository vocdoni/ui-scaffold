import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const link = defineStyle({
  color: 'link',
  textDecoration: 'underline',

  _hover: {
    textDecoration: 'none',
  },
})

export const Button = defineStyleConfig({
  variants: { link },
})
