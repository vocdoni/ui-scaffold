import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsConfirmationAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsConfirmationAnatomy)

const baseStyle = definePartsStyle({
  box: {
    maxH: '50vh',
    overflowY: 'scroll',
  },
})

export const QuestionsConfirmation = defineMultiStyleConfig({
  baseStyle,
})
