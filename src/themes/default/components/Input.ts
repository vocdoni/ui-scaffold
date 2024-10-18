import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 'md',
    bgColor: 'white !important',
    _disabled: {
      backgroundColor: 'white',
      opacity: '0.8',
    },
  },
})

const variants = {
  calendar: definePartsStyle((props) => ({
    field: {
      maxW: 60,
      p: 4,
      minH: '48px',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'gray.200',

      _hover: {
        borderColor: 'gray.400',
      },
      _focus: {
        borderColor: 'blue.500',
      },
    },
  })),
}

export const Input = defineMultiStyleConfig({ baseStyle, variants })
