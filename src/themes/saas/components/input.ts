import { mode } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  field: {
    fontWeight: '500',
    py: '25px',
    color: mode('navy.700', 'white')(props),
    'background-color': mode('transparent', 'transparent')(props),
    border: '1px solid',
    borderColor: mode('secondaryGray.100', 'rgba(135, 140, 189, 0.3)')(props),
    borderRadius: '16px',
    fontSize: 'sm',
    size: 'lg',
    ms: { base: '0px', md: '0px' },
    _placeholder: { color: 'secondaryGray.600', fontWeight: '400' },
    _hover: {
      borderColor: mode('gray.300', 'whiteAlpha.400')(props),
    },
  },
}))

const variants = {
  calendar: definePartsStyle((props) => ({
    field: {
      maxW: 60,
      p: 4,
      minH: '48px',
      borderRadius: 'xl',
      border: '1px solid',

      _hover: {
        borderColor: mode('gray.400', 'gray.500')(props),
      },
      _focus: {
        border: '2px solid',
        outline: mode('blue.500', 'blue.300')(props),
      },
    },
  })),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants,
})
