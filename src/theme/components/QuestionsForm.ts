import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/react-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    bg: 'white',
    borderRadius: 5,
    padding: 5,
  },

  description: {
    marginTop: 4,
    color: 'gray',
  },
  radioGroup: {
    color: 'gray',
  },
})

export const Questions = defineMultiStyleConfig({
  baseStyle,
})
