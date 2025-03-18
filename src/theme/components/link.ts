import { defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: {
    textDecoration: 'underline',
    color: 'link.light',

    _dark: {
      color: 'link.dark',
    },
    _hover: {
      textDecoration: 'none',
    },
  },
  variants: {
    primary: (props) => ({
      color: 'brand.600',

      _dark: {
        color: 'brand.100',
      },
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
    hover_underline: (props) => ({
      textDecoration: 'none',
      color: 'link_hover_underline.light',
      _hover: {
        textDecoration: 'underline',
      },
      _dark: {
        color: 'link_hover_underline.dark',
      },
    }),
  },
})
