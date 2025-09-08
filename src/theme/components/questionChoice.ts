import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionChoiceAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionChoiceAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    '&:has(img), &:has(.chakra-skeleton img)': {
      minH: '350px',
    },
  },

  skeleton: {
    w: '100%',
    h: '150px',
  },

  image: {
    w: '100%',
    h: '100%',
    borderTopRadius: 'lg',
  },

  label: {
    '.chakra-skeleton + &': {
      fontWeight: 'semibold',
      mt: 4,
      px: 4,
    },
  },

  description: {
    '.chakra-skeleton ~ &': {
      px: 4,
    },
  },
})

export const QuestionChoice = defineMultiStyleConfig({
  baseStyle,
})
