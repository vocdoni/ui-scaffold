import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    color: 'process.results.aside.vote_btn_color',
    mb: 4,
    borderRadius: 30,
    p: 7,
    bgColor: 'process.results.aside.vote_btn_bg',
  },

  disconnect: {
    bgColor: 'spreadsheet.disconnect_bg',
    color: 'spreadsheet.diconnect_color',
    textDecoration: 'underline',
  },

  content: {
    p: 10,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  close: {
    display: 'none',
  },
  submit: {
    width: '60%',
    mx: 'auto',
    bgColor: 'process.identify_button_bg',
    color: 'process.identify_button_color',
  },
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
