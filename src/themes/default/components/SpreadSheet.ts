import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: '100%',
    borderRadius: 30,
    fontSize: { base: 'lg', xl: 'md' },
    bgColor: 'process.aside.vote_btn_bg',

    _hover: {
      bgColor: 'process.aside.vote_btn_bg',
    },
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
