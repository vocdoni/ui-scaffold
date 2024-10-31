import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

export const Radio = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => ({
    control: {
      _checked: {
        bgColor: 'radio.bg',
        borderColor: 'radio.color',

        _hover: {
          bgColor: 'radio.bg',
          borderColor: 'radio.color',
        },
      },
    },
  })),
})
