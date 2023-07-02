import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brand = defineStyle({
  color: 'link',
})

export const Link = defineStyleConfig({
  variants: { brand },
})
