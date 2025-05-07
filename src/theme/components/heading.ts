import { defineStyle } from '@chakra-ui/react'

const baseStyle = () => {
  return { height: 'fit-content', letterSpacing: '-0.6px', fontWeight: 'normal' }
}

const sizes = {
  xs: defineStyle({
    fontSize: '24px',
    lineHeight: '28px',
  }),
  sm: defineStyle({
    fontSize: '30px',
    lineHeight: '38px',
  }),
  md: defineStyle({
    fontSize: '36px',
    lineHeight: '44px',
  }),
  lg: defineStyle({
    fontSize: '48px',
    lineHeight: '60px',
  }),
  xl: defineStyle({
    fontSize: '60px',
    lineHeight: '72px',
  }),
  '2xl': defineStyle({
    fontSize: '72px',
    lineHeight: '90px',
  }),
}

const contentsTitle = defineStyle({
  textAlign: 'left',
  fontWeight: 600,
  fontSize: '3xl',
  color: 'gray.700',
  _dark: {
    color: 'gray.300',
  },
})
const contentsSubtitle = defineStyle({
  textAlign: 'left',
  fontWeight: 600,
  fontSize: 'xl',
  color: 'gray.700',
  _dark: {
    color: 'gray.300',
  },
})

const contentsSection = defineStyle({
  fontWeight: 600,
  fontSize: 'md',
  color: 'gray.600',
  _dark: {
    color: 'gray.400',
  },
})

const sidebarTitle = defineStyle({
  fontWeight: 600,
  fontSize: 'lg',
})

const sidebarSection = defineStyle({
  fontWeight: 600,
  fontSize: 'md',
})

export const Heading = {
  baseStyle,
  sizes,
  variants: {
    ['contents-title']: contentsTitle,
    ['contents-section']: contentsSection,
    ['contents-subtitle']: contentsSubtitle,
    ['sidebar-title']: sidebarTitle,
    ['sidebar-section']: sidebarSection,
  },
}

// We want to treat election title as we treat other headings...
export const ElectionTitle = Heading
