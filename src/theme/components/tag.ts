import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 6,
    border: '1px solid',
    borderColor: 'tag.border',
    width: 'fit-content',
  },
})

export const Tag = defineMultiStyleConfig({ baseStyle })
