import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const link = defineStyle({
  color: 'brand.scheme',
  textDecoration: 'underline',

  _hover: {
    textDecoration: 'none',
  },
})

export const Button = defineStyleConfig({
  variants: { link },
})
