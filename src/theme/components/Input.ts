import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _placeholder: {
      opacity: 1,
      color: 'input.placeholder_color',
    },
  },
})

const size = {
  lg: defineStyle({
    fontSize: '2xl',
    fontWeight: 'bold',
  }),
}

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
  }),
}

const outline = definePartsStyle((props) => {
  return {
    field: {
      bg: 'input.bg',
    },
  }
})

export const Input = defineMultiStyleConfig({ baseStyle, variants: { outline }, sizes })
