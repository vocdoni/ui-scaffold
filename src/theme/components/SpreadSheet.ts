import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    color: 'process.aside.vote_btn_color',
    mb: 4,
    borderRadius: 30,
    fontSize: { base: 'sm', xl2: 'md' },
    bgColor: 'process.aside.vote_btn_bg',
  },

  disconnect: {
    bgColor: 'process.spreadsheet.disconnect_bg',
    color: 'process.spreadsheet.diconnect_color',
    textDecoration: 'underline',
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
