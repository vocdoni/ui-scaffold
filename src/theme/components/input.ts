import { mode } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  field: {
    border: mode('1px solid', '0.1px solid')(props),
    borderColor: mode('input.border.light', 'input.border.dark')(props),
    fontSize: '15px',

    _hover: {
      outline: mode('1px solid', '.1px solid')(props),
      outlineColor: mode('input.hover.light', 'input.hover.dark')(props),
      outlineOffset: '0px',
    },

    _focus: {
      outline: '2px solid',
      outlineOffset: '0px',
      outlineColor: 'input.outline',
      borderColor: 'transparent',
    },

    _placeholder: {
      color: mode('input.placeholder.light', 'input.placeholder.dark')(props),
    },
  },
}))

const variants = {
  default: definePartsStyle((props) => ({
    field: {
      maxW: 60,
      py: 6,
      borderRadius: 'xl',
      minW: 'full',
    },
  })),
  calendar: definePartsStyle((props) => ({
    field: {
      maxW: 64,
      minW: 64,
      p: 4,
      minH: '48px',
      borderRadius: 'xl',
    },
  })),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'default',
  },
})
