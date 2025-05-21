import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

const sm = definePartsStyle({
  control: {
    width: 4,
    height: 4,

    _checked: {
      _disabled: {
        borderWidth: 6,
      },
    },
  },
})

const md = definePartsStyle({
  control: {
    width: 5,
    height: 5,

    _checked: {
      _disabled: {
        borderWidth: 7,
      },
    },
  },
})

export const Radio = defineMultiStyleConfig({
  sizes: {
    sm,
    md,
  },
  defaultProps: {
    colorScheme: 'black',
  },
})
