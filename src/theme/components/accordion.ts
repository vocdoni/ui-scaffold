import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const dashboard = definePartsStyle({
  button: {
    borderRadius: 'xl',
    bg: 'dashboard.sidebar.bg.light',
    border: 'var(--border)',
    boxShadow: 'sm',
    _dark: { bg: 'dashboard.sidebar.bg.dark', boxShadow: '0 0 10px #101010' },
    p: 4,
  },
  container: {
    border: 'none',
  },
  panel: {
    border: 'none',
    _dark: {},
  },
  icon: {
    _dark: {},
  },
})

export const Accordion = defineMultiStyleConfig({
  variants: { dashboard },
})
