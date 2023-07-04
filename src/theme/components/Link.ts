import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brand = defineStyle({
  color: 'brand.color',
})

export const Link = defineStyleConfig({
  variants: { brand },
})
