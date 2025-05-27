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
  md: defineStyle({
    py: 6,
    px: 5,
    borderRadius: 'sm',
    fontSize: 'sm',
  }),
  sm: defineStyle({
    py: 5,
    px: 4,
    borderRadius: 'sm',
    fontSize: 'sm',
  }),
  xs: defineStyle({
    py: 4,
    px: 3,
    borderRadius: 'sm',
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
