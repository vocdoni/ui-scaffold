import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: '100%',
    color: 'process.aside.vote_btn_color',
    borderRadius: 30,
    fontSize: { base: 'lg', xl: 'md' },
    bgColor: 'process.aside.vote_btn_bg',
  },

  disconnect: {
    w: 'min-content',
    bgColor: { base: 'transparent', xl: 'process.spreadsheet.disconnect_bg' },
    color: { base: 'white', xl: 'process.spreadsheet.diconnect_color' },
    textDecoration: 'underline',

    _hover: {
      bgColor: { base: 'transparent', xl: 'process.spreadsheet.disconnect_bg' },
      textDecoration: 'none',
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
    display: 'none',
  },
  submit: {
    width: '60%',
    mx: 'auto',
    bgColor: 'process.identify_btn.bg',
    color: 'process.identify_btn.color',
    borderRadius: '30px',

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
