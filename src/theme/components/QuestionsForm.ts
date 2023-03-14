import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/react-components'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    bg: 'white',
    borderRadius: '20px',
    padding: '20px',
    flex: '1 1 1400px',
  },
  // wrapper: {
  //   border: '1px solid red',
  // },
  // alert: {
  //   border: '1px solid red',
  // },

  description: {
    marginTop: '15px',
    color: 'gray',
  },
  radioGroup: {
    color: 'gray',
  },
})
export const Questions = defineMultiStyleConfig({
  baseStyle,
})
