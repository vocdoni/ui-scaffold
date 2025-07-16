import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    fontSize: 'md',
    _placeholder: {
      color: 'input.placeholder',
      fontSize: 'md',
    },
  },
})

const xxl = definePartsStyle({
  field: {
    fontSize: '2xl',
    _placeholder: {
      fontSize: '2xl',
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
    '2xl': xxl,
  },
})
