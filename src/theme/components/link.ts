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
  },
})
