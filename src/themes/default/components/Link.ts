import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  color: 'link.primary',
  textDecoration: 'underline',
  _hover: {
    textDecoration: 'none',
  },
})
const contrast = defineStyle((props) => {
  return {
    color: 'link.contrast',
  }
})

const noUnderline = defineStyle((props) => {
  return {
    textDecoration: 'none',
  }
})

export const Link = defineStyleConfig({
  baseStyle,
  variants: {
    contrast,
    'no-underline': noUnderline,
  },
})
