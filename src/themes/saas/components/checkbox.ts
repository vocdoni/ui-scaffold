import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

export const Checkbox = defineMultiStyleConfig({
  baseStyle: {
    control: {
      border: 'brand.500',
      _checked: {
        borderColor: 'brand.500',
        bgColor: 'brand.500',
      },
      _focus: {
        boxShadow: 'none',
      },
    },
    icon: {
      color: 'white',
    },
  },
})
