import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    fontSize: '14px',
    _placeholder: {
      color: 'input.placeholder',
      fontSize: '14px',
    },
  },
})

const sm = definePartsStyle({
  field: {
    paddingY: 2,
    paddingX: 3,
    borderRadius: 'sm',
  },
})

const md = definePartsStyle({
  field: {
    paddingY: 2.5,
    paddingX: 3.5,
    borderRadius: 'sm',
  },
})

export const Input = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    sm,
    md,
  },
})
