import { mode } from '@chakra-ui/theme-tools'
import { defineStyleConfig } from '@chakra-ui/styled-system'

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '16px',
    boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
    transition: '.25s all ease',
    boxSizing: 'border-box',
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      boxShadow: 'none',
    },
  },
  variants: {
    outline: () => ({
      borderRadius: '16px',
    }),
    brand: (props: any) => ({
      bg: mode('brand.500', 'brand.400')(props),
      color: 'white',
      _focus: {
        bg: mode('brand.500', 'brand.400')(props),
      },
      _active: {
        bg: mode('brand.800', 'brand.600')(props),
      },
      _hover: {
        bg: mode('brand.700', 'brand.600')(props),
      },
    }),
    darkBrand: (props: any) => ({
      bg: mode('brand.900', 'brand.400')(props),
      color: 'white',
      _focus: {
        bg: mode('brand.900', 'brand.400')(props),
      },
      _active: {
        bg: mode('brand.900', 'brand.400')(props),
      },
      _hover: {
        bg: mode('brand.800', 'brand.400')(props),
      },
    }),
    lightBrand: (props: any) => ({
      bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
      color: mode('brand.500', 'white')(props),
      _focus: {
        bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
      },
      _active: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _hover: {
        bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
      },
    }),
    light: (props: any) => ({
      bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      color: mode('secondaryGray.900', 'white')(props),
      _focus: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _active: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _hover: {
        bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
      },
    }),
    action: (props: any) => ({
      fontWeight: '500',
      borderRadius: '50px',
      bg: mode('secondaryGray.300', 'brand.400')(props),
      color: mode('brand.500', 'white')(props),
      _focus: {
        bg: mode('secondaryGray.300', 'brand.400')(props),
      },
      _active: { bg: mode('secondaryGray.300', 'brand.400')(props) },
      _hover: {
        bg: mode('secondaryGray.200', 'brand.400')(props),
      },
    }),
    setup: (props: any) => ({
      fontWeight: '500',
      borderRadius: '50px',
      bg: mode('transparent', 'brand.400')(props),
      border: mode('1px solid', '0px solid')(props),
      borderColor: mode('secondaryGray.400', 'transparent')(props),
      color: mode('secondaryGray.900', 'white')(props),
      _focus: {
        bg: mode('transparent', 'brand.400')(props),
      },
      _active: { bg: mode('transparent', 'brand.400')(props) },
      _hover: {
        bg: mode('secondaryGray.100', 'brand.400')(props),
      },
    }),
    dashboard: (props: any) => ({
      display: 'flex',
      fontWeight: '500',
      borderRadius: '50px',
      color: mode('gray.400', 'white')(props),

      '& span:nth-of-type(2)': {
        ml: 'auto',
      },

      _active: {
        color: mode('black', 'white')(props),
        '& span:first-of-type': {
          color: mode('brand.500', 'brand.500')(props),
        },
      },
      _hover: {
        '& span:first-of-type': {
          color: mode('brand.400', 'brand.400')(props),
        },
      },
    }),
  },
  defaultProps: {
    colorScheme: 'primary',
  },
})
