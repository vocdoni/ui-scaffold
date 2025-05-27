import { theme } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = {
  minW: 0,
  fontWeight: 'bold',
  borderRadius: 'sm',
  fontSize: 'sm',
}

const listmenu = defineStyle(({ colorMode }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'normal',

  _active: {
    fontWeight: 'bold',
  },
  _hover: {
    bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
  },
}))

const sizes = {
  lg: defineStyle({
    py: 7,
    px: 6,
    fontSize: 'md',
  }),
  md: defineStyle({
    py: 6,
    px: 5,
    fontSize: 'sm',
  }),
  sm: defineStyle({
    py: 5,
    px: 4,
    fontSize: 'sm',
  }),
  xs: defineStyle({
    py: 4,
    px: 3,
    fontSize: 'sm',
  }),
}

export const Button = defineStyleConfig({
  variants: {
    ...theme.components.Button.variants,
    listmenu,
  },
  baseStyle,
  sizes,
  defaultProps: {
    size: 'sm',
  },
})
