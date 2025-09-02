import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsConfirmationAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsConfirmationAnatomy)

const baseStyle = definePartsStyle({
  description: {
    color: 'texts.subtle',
    fontSize: 'sm',
  },
})

export const QuestionsConfirmation = defineMultiStyleConfig({
  baseStyle,
})
