import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)
const baseStyle = definePartsStyle({
  content: {
    bg: 'chakra.body.bg',
    padding: 1,
  },
  header: {
    p: 0,
  },
  body: {
    p: 0,
  },
  footer: {
    p: 0,
  },
})
export const Popover = defineMultiStyleConfig({ baseStyle })
