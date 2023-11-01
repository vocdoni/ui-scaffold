import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _disabled: {
      backgroundColor: 'white',
      opacity: '0.8',
    },
  },
})

export const Input = defineMultiStyleConfig({ baseStyle })
