import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)
const baseStyle = definePartsStyle({
  popper: {
    boxShadow: '0 1px 2px 0 rgb(0 0 0/0.05)',
    border: 'var(--border)',
    borderRadius: 'md',
  },
  content: {
    padding: 1,
    border: 'none',
  },
  header: {
    px: 1,
    py: 2,
  },
  body: {
    px: 1,
    py: 2,
  },
  footer: {
    px: 1,
    py: 2,
  },
})
export const Popover = defineMultiStyleConfig({ baseStyle })
