import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const dashboard = definePartsStyle({
  button: {
    paddingY: '5rem',
    paddingX: '2rem',
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
