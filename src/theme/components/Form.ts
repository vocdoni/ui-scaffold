import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(formAnatomy.keys)

const baseStyle = definePartsStyle({
  requiredIndicator: {
    color: 'input.required_asterisk.light',

    _groupInvalid: {
      color: 'input.error.light',
    },

    _dark: {
      color: 'input.required_asterisk.dark',

      _groupInvalid: {
        color: 'input.error.dark',
      },
    },
  },
})

export const Form = defineMultiStyleConfig({
  baseStyle,
})
