import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: {
    border: '1px solid',
    borderColor: 'input.border.light !important',
    fontSize: '15px',
    borderRadius: 'xl',
    bgColor: 'input.bg.light !important',

    _hover: {
      outline: '1px solid',
      outlineColor: 'input.hover.light',
      outlineOffset: '0px',
    },

    _focus: {
      outline: '1px solid',
      outlineOffset: '0px',
      outlineColor: 'input.outline',
      borderColor: 'transparent',
    },

    _placeholder: {
      color: 'input.placeholder.dark',
    },

    _disabled: {
      color: 'input.disabled',
      bgColor: 'input.bg.light !important',
      opacity: 1,
    },

    _dark: {
      border: '0.1px solid',
      borderColor: 'input.border.dark',
      fontSize: '15px',
      bgColor: 'input.bg.dark !important',

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
