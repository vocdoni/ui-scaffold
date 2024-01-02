import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

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

const label = definePartsStyle({
  container: defineStyle({
    '& label': {
      fontFamily: 'pixeloidsans, monospace',
      textTransform: 'uppercase',
      fontSize: 'sm',
    },
  }),
})

const labelRadio = definePartsStyle({
  container: defineStyle({
    borderRadius: '0',
  }),
})

export const Form = defineMultiStyleConfig({
  baseStyle,
  variants: { 'process-create-label': label, 'process-create-radio': labelRadio },
})
