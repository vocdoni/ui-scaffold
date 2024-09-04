import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

export const Modal = defineMultiStyleConfig({
  baseStyle: {
    overlay: {
      bgColor: 'rgba(0 ,0 ,0, 0.8)',
    },
  },
  variants: {
    'dashboard-plans': {
      dialogContainer: {
        minW: '100vw',
        minH: '100vh',
      },
      dialog: {
        borderRadius: 0,
        m: 0,
        px: {
          base: '10px',
          sm: '20px',
        },
        minW: '100vw',
        minH: '100vh',
        bgColor: '#546E39',
      },
      header: {
        pt: '50px',
        textAlign: 'center',
        color: 'white',
        fontSize: '2xl',
      },
      body: {
        px: 0,
        pt: '30px',
        display: 'flex',
        justifyContent: { base: 'start', lg: 'center' },
        alignItems: 'start',
        gap: '10px',
        overflowX: 'auto',
      },
      footer: {
        pt: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        color: 'white',

        '& > div:first-of-type': {
          display: 'flex',
          flexDirection: { base: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: { base: 'start', md: 'center' },
          gap: '10px',

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
          gap: '10px',

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
        top: { base: '10px', md: '52px' },
        right: { base: '10px', md: '52px' },
        color: 'white',

        '& svg': {
          width: { md: '25px' },
          height: { md: '25px' },
        },
      },
    },
  },
})
