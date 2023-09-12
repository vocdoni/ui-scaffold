import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    color: 'process.aside.vote_btn_color',
    mb: 4,
    borderRadius: 30,
    p: 7,
    bgColor: 'process.aside.vote_btn_bg',
  },

  disconnect: {
    bgColor: 'process.spreadsheet.disconnect_bg',
    color: 'process.spreadsheet.diconnect_color',
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
    bgColor: 'process.identify_btn.bg',
    color: 'process.identify_btn.color',

    _hover: {
      bgColor: 'process.identify_btn.bg_hover',
    },
    _active: {
      bgColor: 'process.identify_btn.bg_active',
    },
  },
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
