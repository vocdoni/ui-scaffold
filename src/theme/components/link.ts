import { defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: {
    textDecoration: 'underline',
    color: 'link',

    _hover: {
      textDecoration: 'none',
    },
  },
  variants: {
    primary: (props) => ({
      color: 'brand.600',

      _dark: {
        color: 'brand.100',
      }
    }),
    icon: (props) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'sm',
      minW: '30px',
      h: '30px',
      border: '1px solid',
      cursor: 'pointer',
    }),
    footer: (props) => ({
      textDecoration: 'none',
      color: '#555',

      _hover: {
        textDecoration: 'underline',
      }
    }),
  },
})
