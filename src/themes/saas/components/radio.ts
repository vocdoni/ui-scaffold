import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

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
