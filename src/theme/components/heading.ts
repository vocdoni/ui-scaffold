import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const sidebarTitle = defineStyle({
  pt: 4,
})

const sidebarSubtitle = defineStyle({
  py: 4,
  textTransform: 'capitalize',
})

export const Heading = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
  },
  variants: {
    ['sidebar-title']: sidebarTitle,
    ['sidebar-subtitle']: sidebarSubtitle,
  },
})

// We want to treat election title as we treat other headings...
export const ElectionTitle = Heading
