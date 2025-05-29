import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bgColor: 'rgba(0 ,0 ,0, 0.8)',
  },
  dialogContainer: {
    alignItems: 'center',
  },
  dialog: {
    overflow: 'hidden',
    bgColor: 'chakra.body.bg',
    border: '1px solid',
    borderColor: 'table.border',
  },
  footer: {
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    fontWeight: 'normal',
    fontSize: 'sm',
    color: 'texts.subtle',
    // we usually add <Heading> inside the header
    '& > *': {
      fontSize: 'lg',
      color: 'texts.primary',
      m: 0,
    },
  },
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
  variants: {
    'pricing-modal': {
      header: {
        mt: 8,
        textAlign: 'center',
        color: 'white',
        fontSize: '2xl',
      },
      closeButton: {
        top: { base: 2.5, md: 12 },
        right: { base: 2.5, md: 12 },
        color: 'white',

        '& svg': {
          width: 6,
          height: 6,
        },
      },
    },
  },
})
