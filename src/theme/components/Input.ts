import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

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
      backgroundColor: 'process_create.input_bg',
    },
  }
})

export const Input = defineMultiStyleConfig({ variants: { outline }, sizes })
