import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const baseStyle = (options: StyleFunctionProps) => {
  return { letterSpacing: '0%' }
}

const sizes = {
  xs: defineStyle({
    fontSize: '12px',
    lineHeight: '18px',
  }),
  sm: defineStyle({
    fontSize: '14px',
    lineHeight: '20px',
  }),
  md: defineStyle({
    fontSize: '16px',
    lineHeight: '24px',
  }),
  lg: defineStyle({
    fontSize: '18px',
    lineHeight: '28px',
  }),
  xl: defineStyle({
    fontSize: '20px',
    lineHeight: '30px',
  }),
}

export const Text = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
  },
})
