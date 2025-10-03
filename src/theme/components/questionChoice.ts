import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionChoiceAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionChoiceAnatomy)

const baseStyle = definePartsStyle({
  skeleton: {
    w: '100%',
    h: '150px',
  },

  image: {
    w: '100%',
    h: '100%',
    borderTopRadius: 'lg',
    objectFit: 'cover',
    objectPosition: 'center',
  },

  label: {
    '.chakra-skeleton + &': {
      wordBreak: 'break-word',
      fontWeight: 'semibold',
      mt: 4,
      px: 4,
      mb: 4,
    },
  },

  description: {
    '.chakra-skeleton ~ &': {
      px: 4,
      mb: 4,
    },
  },
})

export const QuestionChoice = defineMultiStyleConfig({
  baseStyle,
})
