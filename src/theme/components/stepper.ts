import { stepperAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  indicator: {
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg.light',
      color: 'process_create.stepper.color_icon.light',
      _dark: {
        background: 'process_create.stepper.bg.dark',
        color: 'process_create.stepper.color_icon.dark',
      },
    },
    '&[data-status=active]': {
      borderColor: 'process_create.stepper.color.light',
      background: 'process_create.stepper.bg.light',
      color: 'process_create.stepper.color_icon.light',

      _dark: {
        borderColor: 'process_create.stepper.color.dark',
        background: 'process_create.stepper.bg.dark',
        color: 'process_create.stepper.color_icon.dark',
      },
    },
  },
  separator: {
    display: { base: 'none', lg: 'inline-block' },
    mt: { lg: 2 },
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg.light',
      _dark: {
        background: 'process_create.stepper.bg.dark',
      },
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
    '&[data-status=active]': {
      fontWeight: 'bold',
      color: 'process_create.stepper.color.light',
      _dark: {
        color: 'process_create.stepper.color.dark',
      },
    },
  },
}))

export const Stepper = defineMultiStyleConfig({
  baseStyle,
})
