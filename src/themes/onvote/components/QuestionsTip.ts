import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionTipAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionTipAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    mt: 4,
    w: 'full',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    pr: 2,
  },
  text: {
    color: 'primary.main',
    opacity: '0.7',
  },
})

export const QuestionsTip = defineMultiStyleConfig({
  baseStyle,
})
