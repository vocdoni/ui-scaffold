import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brandedStyles = (props: any) => {
  const { colorScheme } = props
  return {
    display: 'flex',
    gap: 3,
    bg: props.colorScheme === 'whiteAlpha' ? 'white' : `${colorScheme}.500`,
    color: props.colorScheme === 'whiteAlpha' ? 'black' : 'white',
    _focus: {
      bg: `${colorScheme}.500`,
    },
    _hover: {
      bg: `${colorScheme}.600`,
    },
    _active: {
      bg: `${colorScheme}.700`,
    },
  }
}

export const Button = defineStyleConfig({
  variants: {
    brand: (props: any) => ({
      ...brandedStyles(props),
      borderRadius: 'xl',
    }),
    outline: () => ({ borderRadius: 'full' }),
    rounded: () => ({
      borderRadius: 'full',
    }),
    ['box-shadow']: () => ({
      boxShadow: 'lg',
      borderRadius: 'full',
      _hover: {
        boxShadow: 'md',
      },
      _active: {
        boxShadow: 'none',
      },
    }),
    menu: defineStyle({
      _active: {
        color: 'brand.300',
      },
      _hover: {
        textDecoration: 'underline',
      },
    }),
  },
})
