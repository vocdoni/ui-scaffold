import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

export const Modal = defineMultiStyleConfig({
  baseStyle: {
    overlay: {
      bgColor: 'rgba(0 ,0 ,0, 0.8)',
    },
    dialogContainer: {
      alignItems: 'center',
    },
    dialog: {
      overflow: 'hidden',
      p: { base: 5, lg: 10 },
      m: 0,
    },
    footer: {
      justifyContent: 'center',
    },
    closeButton: {
      top: 3,
      w: 6,
      h: 6,

      '& svg': {
        w: 2.5,
        h: 2.5,
      },

      _hover: {
        bgColor: 'transparent',
      },

      _active: {
        border: '2px solid black',
      },
    },
  },
  variants: {
    'pricing-modal': {
      dialog: {
        borderRadius: 0,
        m: 0,
        px: {
          base: 2.5,
          sm: 5,
        },

        bgColor: 'pricing_modal.bg.light',
        _dark: {
          bgColor: 'pricing_modal.bg.dark',
        },
      },
      header: {
        pt: 12,
        textAlign: 'center',
        color: 'white',
        fontSize: '2xl',
      },
      body: {
        px: 0,
        pt: 8,
        display: 'flex',
        justifyContent: { base: 'start', lg: 'center' },
        alignItems: 'start',
        gap: '10px',
        overflowX: 'auto',
      },
      footer: {
        pt: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        color: 'white',

        '& > div:first-of-type': {
          display: 'flex',
          flexDirection: { base: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: { base: 'start', md: 'center' },
          gap: 2.5,

          '& p': {
            textAlign: 'center',
            maxW: '800px',
            fontWeight: 'bold',
            whiteSpace: { md: 'nowrap' },
          },
        },
        '& > p': {
          textAlign: 'center',
          maxW: '800px',
          fontWeight: 'normal',
        },

        '& > div:nth-of-type(2)': {
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,

          '& > p': {
            whiteSpace: 'nowrap',
          },
        },
        '& > div:last-of-type': {
          width: 'content',
          ml: { md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
      closeButton: {
        top: { base: 2.5, md: 12 },
        right: { base: 2.5, md: 12 },
        color: 'white',

        '& svg': {
          width: { md: 6 },
          height: { md: 6 },
        },
      },
    },
  },
})
