import { defineStyleConfig } from '@chakra-ui/react'

export const Badge = defineStyleConfig({
  baseStyle: {
    borderRadius: '10px',
    lineHeight: '100%',
    padding: '7px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  variants: {
    outline: {
      borderRadius: '16px',
    },
    brand: {
      bg: 'brand.500',
      color: 'white',

      _focus: {
        bg: 'brand.500',
      },
      _active: {},
      _hover: {
        bg: 'brand.600',
      },

      _dark: {
        bg: 'brand.400',

        _hover: {
          bg: 'brand.400',
        },
        _focus: {
          bg: 'brand.400',
        },
        _active: {
          bg: 'brand.400',
        },
      },
    },
  },
})
