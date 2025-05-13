import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    fontSize: '14px',
    _placeholder: {
      color: 'input.placeholder',
      fontSize: '14px',
    },
  },
})

const sm = definePartsStyle({
  field: {
    paddingY: 2,
    paddingX: 3,
    borderRadius: 'sm',
  },
})

const md = definePartsStyle({
  field: {
    paddingY: 2.5,
    paddingX: 3.5,
    borderRadius: 'sm',
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
const def = definePartsStyle({
  field: {
    background: 'revert',
    bgColor: 'input.bg',
    border: '1px solid',
    borderColor: 'input.border',
    boxShadow: 'none !important',
    _focusVisible: {
      outlineColor: 'input.outline',
      boxShadow: 'none !important',
    },
  },
})

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants: {
    calendar,
    def,
  },
  sizes: {
    sm,
    md,
  },
  defaultProps: {
    variant: 'def',
  },
})
