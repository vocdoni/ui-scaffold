import { stepperAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  indicator: {
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg',
    },
    '&[data-status=active]': {
      borderColor: 'process_create.stepper.bg',
      background: 'process_create.stepper.bg',
      color: 'process_create.stepper.color_active',
    },
  },
  separator: {
    display: { base: 'none', lg: 'inline-block' },
    mt: { lg: 2 },
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg',
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
