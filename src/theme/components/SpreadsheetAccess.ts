import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid',
    bg: '#276958',
    borderColor: '#12271f',
    color: 'spreadsheet_access_btn.primary.color',

    _hover: {
      bg: '#205345',
      borderColor: '#12271f',
      _disabled: {
        bg: 'spreadsheet_access_btn.primary.disabled.light.bg',
        color: 'spreadsheet_access_btn.primary.disabled.light.color',
        borderColor: 'spreadsheet_access_btn.primary.disabled.light.border',
        opacity: 1,
        _dark: {
          bg: 'spreadsheet_access_btn.primary.disabled.dark.bg',
          color: 'spreadsheet_access_btn.primary.disabled.dark.color',
          borderColor: 'spreadsheet_access_btn.primary.disabled.dark.border',
          opacity: 0.4,
        },
      },
    },
    _active: { bg: '#193d32' },
    _disabled: {
      bg: 'spreadsheet_access_btn.primary.disabled.light.bg',
      color: 'spreadsheet_access_btn.primary.disabled.light.color',
      borderColor: 'spreadsheet_access_btn.primary.disabled.light.border',
      opacity: 1,
      _dark: {
        bg: 'spreadsheet_access_btn.primary.disabled.dark.bg',
        color: 'spreadsheet_access_btn.primary.disabled.dark.color',
        borderColor: 'spreadsheet_access_btn.primary.disabled.dark.border',
        opacity: 0.4,
      },
    },
  },
  disconnect: {
    color: 'black',
    textDecoration: 'underline',
    border: 'none',
    bgColor: 'transparent',
    _hover: {
      color: 'gray.800',
      textDecoration: 'none',

      _disabled: {
        color: 'spreadsheet_access_btn.common.disabled.color.light',

        _dark: {
          color: 'spreadsheet_access_btn.common.disabled.color.dark',
        },
      },

      _dark: {
        color: 'gray.800',
      },
    },
    _disabled: {
      color: 'spreadsheet_access_btn.common.disabled.color.light',

      _dark: {
        color: 'spreadsheet_access_btn.common.disabled.color.light',
      },
    },

    _dark: {
      color: 'white',
      _hover: {
        color: 'white',
      },
    },
  },

  close: {
    display: 'none',
  },

  input: { mb: 5 },
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
