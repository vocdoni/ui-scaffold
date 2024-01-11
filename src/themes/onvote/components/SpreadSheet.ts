import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: '100%',
  },
  disconnect: {
    w: 'min-content',
    textDecoration: 'underline',

    _hover: {
      textDecoration: 'none',
    },
    _active: {
      bgColor: 'transparent',
    },
  },
  label: {
    textTransform: 'none',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  close: {
    display: 'none !important',
  },
  footer: {},
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
