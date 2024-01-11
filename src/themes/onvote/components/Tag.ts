import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const xl = defineStyle({
  px: '8',
  py: '2',
  fontSize: '16',
  textTransform: 'uppercase',
})

const sizes = {
  xl: definePartsStyle({ container: xl }),
}

export const Tag = defineMultiStyleConfig({
  sizes,
})
