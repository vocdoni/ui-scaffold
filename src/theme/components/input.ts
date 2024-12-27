import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    background: 'revert',
    bgColor: 'input.bg.light',

    _dark: {
      bgColor: 'input.bg.dark',
    },

    _invalid: {
      _focusVisible: {
        borderColor: 'input.error',
        boxShadow: '0px 0px 0px 1px #FC8181',
      },
    },
  },

  element: {
    color: 'input.element',
  },
})

const sm = definePartsStyle({
  field: {
    paddingY: 2,
    paddingX: 3,
    borderRadius: 'lg',
  },
})

const md = definePartsStyle({
  field: {
    paddingY: 2.5,
    paddingX: 3.5,
    borderRadius: 'lg',
  },
})

const calendar = definePartsStyle({
  field: {
    width: 'fit-content',
    borderRadius: 'lg',
    border: '1px solid',
    borderColor: 'input.calendar_border',
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
