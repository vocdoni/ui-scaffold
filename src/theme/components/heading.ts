import { defineStyle } from '@chakra-ui/react'

const sizes = {
  xxs: defineStyle({
    fontSize: '20px',
    lineHeight: '25px',
    letterSpacing: '0%',
  }),
  xs: defineStyle({
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '0%',
  }),
  sm: defineStyle({
    fontSize: '30px',
    lineHeight: '38px',
    letterSpacing: '0%',
  }),
  md: defineStyle({
    fontSize: '36px',
    lineHeight: '44px',
    letterSpacing: '-2%',
  }),
  lg: defineStyle({
    fontSize: '48px',
    lineHeight: '60px',
    letterSpacing: '-2%',
  }),
  xl: defineStyle({
    fontSize: '60px',
    lineHeight: '72px',
    letterSpacing: '-2%',
  }),
  xl2: defineStyle({
    fontSize: '72px',
    lineHeight: '90px',
    letterSpacing: '-2%',
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
