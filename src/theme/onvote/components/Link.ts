import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  color: 'link.primary',
  textDecoration: 'underline',
  _hover: {
    textDecoration: 'none',
  },
})
const primary = defineStyle({
  color: 'link.primary',
})

const contrast = defineStyle((props) => {
  return {
    color: 'link.contrast',
  }
})
export const Link = defineStyleConfig({
  baseStyle,
  variants: {
    contrast,
    primary,
  },
})
