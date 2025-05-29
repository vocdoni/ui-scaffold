import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export const Link = defineStyleConfig({
  baseStyle: defineStyle({
    color: 'gray.800',
    _dark: {
      color: 'gray.400',
      _hover: {
        color: 'gray.200',
      },
    },
    _hover: {
      textDecoration: 'none',
      color: 'gray.500',
    },
  }),
  variants: {
    breadcrumb: defineStyle({
      color: 'dashboard.breadcrumb',
      textDecoration: 'none',
      _hover: {
        color: 'black',
      },
    }),
    icon: defineStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'sm',
      minW: '30px',
      h: '30px',
      border: '1px solid',
      cursor: 'pointer',
    }),
    footer: defineStyle({
      textDecoration: 'none',
      color: 'process_create.footer_link',

      _hover: {
        textDecoration: 'underline',
      },
    }),
  },
})
