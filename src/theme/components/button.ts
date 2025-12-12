import { theme } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  minW: 0,
  fontWeight: 'bold',
  borderRadius: 'sm',
  fontSize: 'sm',
  transition: 'all 0.2s',
})

const listmenu = defineStyle(({ colorMode }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'normal',
  borderRadius: 'sm',

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

const navbar = defineStyle(() => ({
  textAlign: 'left',
  fontWeight: 'semibold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  fontSize: 'md',
  h: 'fit-content',
}))

// Primary CTA variant (replaces colorScheme='black')
const primary = defineStyle({
  bg: 'button.primary.bg',
  color: 'button.primary.color',
  fontWeight: 'bold',
  _hover: {
    bg: 'button.primary.hover.bg',
    _disabled: {
      bg: 'button.primary.bg',
    },
  },
  _active: {
    bg: 'button.primary.active.bg',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
})

// Secondary outline variant (replaces variant='outline')
const secondary = defineStyle({
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'button.secondary.border',
  color: 'button.secondary.color',
  fontWeight: 'bold',
  _hover: {
    bg: 'button.secondary.hover.bg',
    _disabled: {
      bg: 'transparent',
    },
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
})

// Danger variant (replaces colorScheme='red')
const danger = defineStyle({
  bg: 'button.danger.bg',
  color: 'button.danger.color',
  fontWeight: 'bold',
  _hover: {
    bg: 'button.danger.hover.bg',
    _disabled: {
      bg: 'button.danger.bg',
    },
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
})

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
} as const

// Helper function to convert space values to CSS variables
const spaceVar = (v: number | string) => (typeof v === 'number' ? `var(--chakra-space-${v})` : v)

const outline = defineStyle((props) => {
  const s = (props.size ?? 'sm') as keyof typeof sizes
  const base = sizes[s] ?? sizes.sm

  const pyToken = (base as any).py ?? (sizes.sm as any).py
  const pxToken = (base as any).px ?? (sizes.sm as any).px

  // border width
  const bw = '1px'

  return {
    ...theme.components.Button.variants.outline(props),
    borderWidth: bw,
    py: `calc(${spaceVar(pyToken)} - ${bw})`,
    px: `calc(${spaceVar(pxToken)} - ${bw})`,
  }
})

export const Button = defineStyleConfig({
  variants: {
    // New semantic variants
    primary,
    secondary,
    danger,

    // Existing Chakra variants
    ...theme.components.Button.variants,

    // Custom variants (keep)
    unstyled,
    navbar,
    listmenu,
    outline,
    profilemenu,
  },
  baseStyle,
  sizes,
  defaultProps: {
    size: 'sm',
  },
})
