import { mode } from '@chakra-ui/theme-tools'
import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: (props) => ({
    border: mode('1px solid', '0.1px solid')(props),
    borderColor: mode('input.border.light', 'input.border.dark')(props),
    fontSize: '15px',

    _hover: {
      outline: mode('1px solid', '.1px solid')(props),
      outlineColor: mode('input.hover.light', 'red')(props),
      outlineOffset: '0px',
    },

    _focus: {
      outline: '2px solid',
      outlineOffset: '0px',
      outlineColor: 'red',
      borderColor: 'transparent',
    },

    _placeholder: {
      color: mode('input.placeholder.light', 'input.placeholder.dark')(props),
    },
  }),
})
