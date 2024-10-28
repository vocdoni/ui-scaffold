import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: {
    border: '1px solid',
    borderColor: 'input.border.light',
    fontSize: '15px',

    _hover: {
      outline: '1px solid',
      outlineColor: 'input.hover.light',
      outlineOffset: '0px',
    },

    _focus: {
      outline: '2px solid',
      outlineOffset: '0px',
      outlineColor: 'red',
      borderColor: 'transparent',
    },

    _placeholder: {
      color: 'input.placeholder.dark',
    },

    _dark: {
      border: '0.1px solid',
      borderColor: 'input.border.dark',
      fontSize: '15px',
      _hover: {
        outline: '.1px solid',
        outlineColor: 'input.hover.dark',
        outlineOffset: '0px',
      },

      _placeholder: {
        color: 'input.placeholder.dark',
      },
    },
  },
})
