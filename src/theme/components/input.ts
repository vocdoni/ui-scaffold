import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    background: 'revert',
    borderRadius: 'lg',
    bgColor: 'input.bg.light',

    _dark: {
      bgColor: 'input.bg.dark',
    },
  },
  group: {
    borderRadius: 'lg',
  },
  element: {
    color: 'input.element',
  },
})

const sm = definePartsStyle({
  field: {
    paddingY: 2,
    paddingX: 3,
  },
})

const md = definePartsStyle({
  field: {
    paddingY: 2.5,
    paddingX: 3.5,
  },
})

const calendar = definePartsStyle({
  field: {
    width: 'fit-content',
    borderRadius: 'lg',
    border: '1px solid',
    borderColor: '#e2e8f0',
    outlineOffset: 0,

    _hover: {
      outline: '.1px solid',
      outlineColor: '#e2e8f0',
    },

    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'input.outline.light',
    },

    _dark: {
      border: '1px solid',
      borderColor: 'input.border',

      _hover: {
        outline: '1px solid',
        outlineColor: 'input.border',
      },

      _focusVisible: {
        outline: '1px solid',
        outlineColor: 'input.outline.dark',
      },
    },
  },
})

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants: {
    calendar,
  },
  sizes: {
    sm,
    md,
  },
})
