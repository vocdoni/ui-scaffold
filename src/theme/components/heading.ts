import { defineStyle } from '@chakra-ui/react'

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
