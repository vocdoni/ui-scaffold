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
    color: 'button.variant.primary.color',

    _hover: {
      bg: '#205345',
      borderColor: '#12271f',
      _disabled: {
        bg: 'button.variant.primary.disabled.light.bg',
        color: 'button.variant.primary.disabled.light.color',
        borderColor: 'button.variant.primary.disabled.light.border',
        opacity: 1,
        _dark: {
          bg: 'button.variant.primary.disabled.dark.bg',
          color: 'button.variant.primary.disabled.dark.color',
          borderColor: 'button.variant.primary.disabled.dark.border',
          opacity: 0.4,
        },
      },
    },
    _active: { bg: '#193d32' },
    _disabled: {
      bg: 'button.variant.primary.disabled.light.bg',
      color: 'button.variant.primary.disabled.light.color',
      borderColor: 'button.variant.primary.disabled.light.border',
      opacity: 1,
      _dark: {
        bg: 'button.variant.primary.disabled.dark.bg',
        color: 'button.variant.primary.disabled.dark.color',
        borderColor: 'button.variant.primary.disabled.dark.border',
        opacity: 0.4,
      },
    },
  },
  disconnect: {
    color: 'black',
    textDecoration: 'underline',
    border: 'none',
    _hover: {
      color: 'gray.800',
      textDecoration: 'none',

      _disabled: {
        color: 'button.variant.common.disabled.color.light',

        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        color: 'gray.800',
      },
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',

      _dark: {
        color: 'button.variant.common.disabled.color.light',
      },
    },

    _dark: {
      color: 'white',
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
