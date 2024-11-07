import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'input.border.light !important',
    fontSize: '15px',
    maxW: 60,
    py: 6,
    borderRadius: 'xl',
    minW: 'full',
    bgColor: 'input.bg.light !important',

    _hover: {
      outline: '.1px solid',
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
      color: 'input.placeholder',
    },

    _disabled: {
      bgColor: 'input.bg.light !important',
      opacity: 1,
    },

    _dark: {
      border: '0.1px solid',
      borderColor: 'input.border.dark',
      bgColor: 'input.bg.dark !important',

      _hover: {
        outlineOffset: '0px',
        outline: '.1px solid',
        outlineColor: 'input.hover.dark',
      },

      _focus: {
        outline: '2px solid',
        outlineOffset: '0px',
        outlineColor: 'input.outline',
        borderColor: 'transparent',
      },
    },
  },
})

const variants = {
  calendar: definePartsStyle({
    field: {
      maxW: 64,
      minW: 64,
      p: 4,
      minH: '48px',
      borderRadius: 'xl',
    },
  }),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants,
})
