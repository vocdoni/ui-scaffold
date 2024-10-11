import { mode } from '@chakra-ui/theme-tools'
import { stepperAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  indicator: {
    '&[data-status=complete]': {
      background: 'text.brand',
    },
    '&[data-status=active]': {
      borderColor: 'text.brand',
      background: 'text.brand',
      color: 'white',
    },
  },
  separator: {
    display: { base: 'none', lg: 'inline-block' },
    mt: { lg: 2 },
    '&[data-status=complete]': {
      background: 'text.brand',
    },
  },
  stepper: {
    '&:first-of-type': {
      h: { lg: '600px' },
      my: { lg: 10 },
    },
  },
  title: {
    mt: 1.5,
    fontSize: 'xs',
    display: { base: 'none', lg: 'block' },
  },
}))

export const Stepper = defineMultiStyleConfig({
  baseStyle,
})
