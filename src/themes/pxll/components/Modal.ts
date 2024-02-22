import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bgColor: 'rgba(0 ,0 ,0, 0.8)',
  },
  dialog: {
    p: { base: 10, lg: 14 },
  },
  header: {
    padding: 0,
    margin: 0,
    textAlign: 'center',

    '& p': {
      mb: 5,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '30px',
    },

    '& > div': {
      height: '150px',
      bgSize: 'cover',
      borderRadius: 'lg',
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
      px: 16,
    },
  },
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
})
