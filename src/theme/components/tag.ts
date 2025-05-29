import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle(() => ({
  container: {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 'sm',
    fontWeight: 'bold',
    py: 1,
    px: 3,
  },
}))

export const Tag = defineMultiStyleConfig({
  baseStyle,
})
