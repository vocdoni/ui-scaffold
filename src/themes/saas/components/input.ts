import { mode } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  field: {
    fontWeight: '500',
    py: '25px',
    color: mode('navy.700', 'white')(props),
    'background-color': 'transparent',
    borderRadius: 'xl',
    fontSize: 'sm',
    size: 'lg',
    ms: { base: '0px', md: '0px' },
    _placeholder: { color: 'secondaryGray.600', fontWeight: '400' },
  },
}))

const variants = {
  calendar: definePartsStyle((props) => ({
    field: {
      maxW: 60,
      p: 4,
      minH: '48px',
      borderRadius: 'xl',
    },
  })),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants,
})
