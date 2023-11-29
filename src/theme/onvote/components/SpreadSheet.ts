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
  // button: {
  //   mx: 'auto',
  //   w: 'calc(100%)',
  //   maxH: '38px',
  //   lineHeight: '20px',
  //   fontSize: '14px',
  //   fontWeight: 700,
  //   fontFamily: 'pixeloid',
  //   cursor: 'pointer',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   gap: 2,
  //   borderLeft: '5px solid',
  //   borderRight: '5px solid',
  //   bgColor: 'button.ghost.bg',
  //   color: 'button.ghost.color',
  //   borderColor: 'button.ghost.bg',

  //   _before: {
  //     content: '""',
  //     position: 'absolute',
  //     top: '-4px',
  //     width: '100%',
  //     height: '4px',
  //     transition: 'width 0.3s ease',
  //     bgColor: 'button.ghost.bg',
  //   },
  //   _after: {
  //     content: '""',
  //     position: 'absolute',
  //     bottom: '-4px',
  //     width: '100%',
  //     height: '4px',
  //     transition: 'width 0.3s ease',
  //     bgColor: 'button.ghost.bg',
  //   },

  //   _hover: {
  //     color: 'button.ghost.color_hover',
  //     width: 'calc(100% + 10px)',
  //   },

  //   _active: {
  //     width: '100%',
  //   },
  // },
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
  footer: {
    border: '1px solid red',
  },
  submit: {
    // px: 16,
    // mx: 'auto',
    maxH: '38px',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: 'pixeloid',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderLeft: '5px solid',
    borderRight: '5px solid',
    bgColor: 'button.main',
    color: 'button.color',
    borderColor: 'button.main',

    _before: {
      content: '""',
      position: 'absolute',
      top: '-4px',
      width: '100%',
      height: '4px',
      transition: 'width 0.3s ease',
      bgColor: 'button.main',
    },
    _after: {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      width: '100%',
      height: '4px',
      transition: 'width 0.3s ease',
      bgColor: 'button.main',
    },

    _hover: {
      bgColor: 'button.dark',
      borderColor: 'button.dark',
      // width: 'calc(100% + 10px)',

      _before: {
        width: '100%',
        bgColor: 'button.dark',
      },

      _active: {
        width: '100%',
        bgColor: 'button.dark',
      },
    },

    _active: {
      bgColor: 'button.main',
      borderColor: 'button.light',
      _before: {
        // width: '100%',

        bgColor: 'button.light',
      },

      _after: {
        // width: '100%',

        bgColor: 'button.light',
      },
    },
  },
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
