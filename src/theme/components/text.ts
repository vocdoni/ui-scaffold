import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

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
  '2xl': defineStyle({
    fontSize: '24px',
    lineHeight: 1.3,
  }),
}

export const Text = defineStyleConfig({
  sizes,
  variants: {
    subheader: defineStyle({
      color: 'texts.subtle',
      fontWeight: 'normal',
    }),
  },
  defaultProps: {
    size: 'md',
  },
})
