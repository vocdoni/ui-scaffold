import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const contrast = defineStyle((props) => {
  return {
    color: 'link.contrast',
  }
})
const primary = defineStyle({
  color: 'link.primary',
})

export const Link = defineStyleConfig({
  variants: { contrast, primary },
})
