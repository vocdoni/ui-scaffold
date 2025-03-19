import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'
import { colorsBase } from '~theme/colors'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    bgColor: colorsBase.primary.light,

    _hover: {
      bgColor: colorsBase.primary.button.light.hover,
    },

    _active: {
      bgColor: colorsBase.primary.button.light.active,
    },

    _disabled: {
      bg: '#EDF2F7',
      border: '#E2E8F0',
      color: '#A0AEC0',
      opacity: 1,
    },

    _dark: {
      color: 'black',
      bgColor: colorsBase.primary.dark,

      _hover: {
        bgColor: colorsBase.primary.button.dark.hover,
      },

      _active: {
        bgColor: colorsBase.primary.button.dark.active,
      },

      _disabled: {
        bg: '#22262f',
        color: '#22262f',
        borderColor: '#22262f',
        opacity: 0.4,
      },
    },
  },
  disconnect: {
    textDecoration: 'underline',
    border: 'none',
    bgColor: 'transparent !important',
    color: 'black',
    _hover: {
      color: 'black',
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
