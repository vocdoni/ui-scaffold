import { stepperAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(stepperAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  separator: {
    display: { base: 'none', lg: 'inline-block' },
    mt: { lg: 2 },
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
  defaultProps: {
    colorScheme: 'black',
  },
})
