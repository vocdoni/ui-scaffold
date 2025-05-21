import { defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'gray.800',
    _hover: {
      textDecoration: 'none',
      color: 'gray.500',
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
