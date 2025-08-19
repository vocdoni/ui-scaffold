import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    border: '3px solid !important',
    borderColor: 'black !important',
    borderRadius: 0,
    transform: 'scale(0.8) !important',

    _hover: {
      opacity: 0.75,
    },
  },

  icons: {
    color: 'black !important',
  },
})

export const ElectionActions = defineMultiStyleConfig({
  baseStyle,
})
