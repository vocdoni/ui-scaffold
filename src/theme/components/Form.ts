import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(formAnatomy.keys)

const baseStyle = definePartsStyle({
  helperText: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    fontSize: 'xs',

    '& svg': {
      color: 'process_create.description_logo',
      boxSize: 3,
    },
  },
})

export const Form = defineMultiStyleConfig({ baseStyle })
