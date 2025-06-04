import { theme } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  minW: 0,
  fontWeight: 'bold',
  borderRadius: 'sm',
  fontSize: 'sm',
})

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

const profilemenu = defineStyle((props) => ({
  ...theme.components.Button.variants.ghost(props),
  w: 'full',
  px: 2,
  py: 1.5,
  borderRadius: 'xs',
  display: 'flex',
  justifyContent: 'start',
}))

const unstyled = defineStyle(() => ({
  textAlign: 'left',
}))

const sizes = {
  lg: defineStyle({
    py: 7,
    px: 6,
    h: '14',
    minW: '14',
    fontSize: 'md',
  }),
  md: defineStyle({
    py: 6,
    px: 5,
    h: '12',
    minW: '12',
    fontSize: 'sm',
  }),
  sm: defineStyle({
    py: 5,
    px: 4,
    h: '10',
    minW: '10',
    fontSize: 'sm',
  }),
  xs: defineStyle({
    py: 4,
    px: 3,
    h: '8',
    minW: '8',
    fontSize: 'sm',
  }),
}

export const Button = defineStyleConfig({
  variants: {
    ...theme.components.Button.variants,
    unstyled,
    listmenu,
    profilemenu,
  },
  baseStyle,
  sizes,
  defaultProps: {
    size: 'sm',
  },
})
