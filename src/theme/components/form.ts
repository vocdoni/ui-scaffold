import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(formAnatomy.keys)
const baseStyle = definePartsStyle({})

export const Form = defineMultiStyleConfig({
  baseStyle,
})

export const FormLabel = defineStyleConfig({
  baseStyle: {
    fontSize: 'sm',
    fontWeight: 'normal',
  },
})
