import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { actionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(actionsAnatomy)

const baseStyle = definePartsStyle({
  group: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // bgColor: 'red !important',
    border: '1px solid red !important',
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
    color: 'red !important',
  },
})

export const ElectionActions = defineMultiStyleConfig({
  baseStyle,
})
