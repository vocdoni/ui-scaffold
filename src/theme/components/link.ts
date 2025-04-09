import { defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'link.light',
    textDecoration: 'underline',

    _dark: {
      color: 'link.dark',
    },
    _hover: {
      textDecoration: 'none',
    },
  },
  variants: {
    breadcrumb: (props) => ({
      color: 'dashboard.breadcrumb',
      textDecoration: 'none',

      _hover: {
        color: 'black',
      },
    }),
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
    footer: (props) => ({
      textDecoration: 'none',
      color: 'process_create.footer_link',

      _hover: {
        textDecoration: 'underline',
      },
    }),
  },
})
