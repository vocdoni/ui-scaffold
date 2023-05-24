import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  group: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  buttons: {
    border: '3px solid black !important',
    borderRadius: '50% !important',
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
