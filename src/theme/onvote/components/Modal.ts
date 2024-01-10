import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import closeIcon from '/assets/close-icon.svg'

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
    fontFamily: 'pixeloidsans, monospace',

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
  },
  closeButton: {
    position: 'absolute',
    bgImage: closeIcon,
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
