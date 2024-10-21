import { mode } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const variants = {
  default: definePartsStyle((props) => ({
    field: {
      maxW: 60,
      py: 6,
      fontSize: 'sm',
      borderRadius: 'xl',
      minW: 'full',
      'background-color': mode('input.light.bg', '#303B4D')(props),
      border: mode('1px solid', '0.1px solid')(props),
      borderColor: mode('input.light.outline', 'input.dark.outline')(props),

      _hover: {
        outline: mode('1px solid', '.1px solid')(props),
        outlineColor: mode('input.light.outline', 'input.dark.outline')(props),
        outlineOffset: '0px',
      },

      _focus: {
        outline: '2px solid',
        outlineOffset: '0px',
        outlineColor: '#3965FF',
        border: mode('1px solid transparent', '0.1px solid transparent')(props),
      },
    },
  })),
  calendar: definePartsStyle((props) => ({
    field: {
      maxW: 64,
      minW: 64,
      p: 4,
      minH: '48px',
      borderRadius: 'xl',
      'background-color': mode('input.light.bg', '#303B4D')(props),
      border: mode('1px solid', '0.1px solid')(props),
      borderColor: mode('input.light.outline', 'input.dark.outline')(props),

      _hover: {
        outline: mode('1px solid', '.1px solid')(props),
        outlineColor: mode('input.light.outline', 'input.dark.outline')(props),
        outlineOffset: '0px',
      },

      _focus: {
        outline: '2px solid #3965FF',
        outlineOffset: '0px',
        border: mode('1px solid transparent', '0.1px solid transparent')(props),
      },
    },
  })),
}

export const Input = defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: 'default',
  },
})
