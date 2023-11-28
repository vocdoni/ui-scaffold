import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bgColor: 'rgba(0 ,0 ,0, 0.8)',
  },

  dialog: {
    p: '16px',
    w: '420px',
    borderRadius: 0,
    clipPath:
      'polygon(0% 8px, 8px 8px, 8px 0%, calc(100% - 8px) 0%, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0% calc(100% - 8px))',
  },
  header: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'pixeloid',

    '& p': {
      mb: 5,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '30px',
    },

    '& > div': {
      height: '240px',
      bgSize: 'cover',
    },
  },
  body: {
    padding: 0,
    mt: 5,
  },
  footer: {
    justifyContent: 'center',
    padding: 0,
    mt: 8,

    '& button': {
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

      before: {
        content: '""',
        position: 'absolute',
        top: '-4px',
        width: '100%',
        height: '4px',
        transition: 'width 0.3s ease',
        bgColor: 'button.main',
      },
      after: {
        content: '""',
        position: 'absolute',
        bottom: '-4px',
        width: '100%',
        height: '4px',
        transition: 'width 0.3s ease',
        bgColor: 'button.main',
      },

      hover: {
        bgColor: 'button.dark',
        borderColor: 'button.dark',
        width: 'calc(100% + 10px)',
        _before: {
          bgColor: 'button.dark',
        },
        _active: {
          bgColor: 'button.dark',
        },
      },

      active: {
        width: '100%',
        bgColor: 'button.main',
        borderColor: 'button.light',

        _before: {
          bgColor: 'button.light',
        },

        _active: {
          bgColor: 'button.light',
        },
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
        },
      },
    },
  },
  closeButton: {
    position: 'absolute',
    bgImage: '/assets/close-icon.svg',
    bgRepeat: 'no-repeat',
    bgPosition: 'center',
    borderRadius: 0,

    '& svg': {
      display: 'none',
    },
  },
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
})
