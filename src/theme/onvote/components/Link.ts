import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  color: 'link.primary',
})
export const Link = defineStyleConfig({
  variants: {
    primary,
  },
})
