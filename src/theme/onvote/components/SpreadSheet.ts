import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: '100%',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: 'pixeloid',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    clipPath:
      'polygon(0% 5px, 5px 5px, 5px 0%, calc(100% - 5px) 0%, calc(100% - 5px) 5px, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 5px calc(100% - 5px), 0% calc(100% - 5px))',

    border: '5px solid transparent',
    bgColor: 'button.ghost.bg',
    color: 'button.ghost.color',

    _hover: {
      color: 'button.ghost.color_hover',
    },

    _active: {
      borderColor: 'button.light2',
    },

    _disabled: {
      bgColor: 'button.disabled.bg',
      color: 'button.disabled.color',

      _before: {
        bgColor: 'button.disabled.bg',
        transition: 'none',
      },
      _after: {
        bgColor: 'button.disabled.bg',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        color: 'transparent',

        _before: {
          bgColor: 'transparent',
        },
        _after: {
          bgColor: 'transparent',
        },

        '& div': {
          transition: 'none',

          _before: {
            bgColor: 'transparent',
          },
          _after: {
            bgColor: 'transparent',
          },
        },
      },
      '& div:first-of-type': {
        _before: {
          bgColor: 'button.disabled.bg',
        },
        _after: {
          bgColor: 'button.disabled.bg',
        },
      },
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
    px: 16,
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
