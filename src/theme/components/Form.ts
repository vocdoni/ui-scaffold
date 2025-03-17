import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(formAnatomy.keys)

const baseStyle = definePartsStyle({
  requiredIndicator: {
    color: 'input.required_asterisk',

    _groupInvalid: {
      color: 'input.error',
    },
  },
})

export const Form = defineMultiStyleConfig({
  baseStyle,
})

export const FormLabel = defineStyleConfig({
  baseStyle: {
    fontWeight: 600,
  },
})
