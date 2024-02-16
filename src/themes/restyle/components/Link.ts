import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const contrast = defineStyle((props) => {
  return {
    color: 'link.contrast',
  }
})
const primary = defineStyle({
  color: 'link.primary',
})

const footer = defineStyle({
  fontSize: '15px',
  lineHeight: '26px',
  color: 'footer_link',
})

export const Link = defineStyleConfig({
  variants: { contrast, footer, primary },
})
