import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(formAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
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
