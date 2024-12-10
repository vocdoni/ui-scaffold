import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const solid = (props: any) => {
  const { colorScheme } = props
  return {
    bg: `${colorScheme}.600`,
    border: '1px solid',

    _hover: {
      bg: `${colorScheme}.700`,

      _disabled: {
        color: 'gray.400',
        bgColor: 'gray.200',
        borderColor: 'gray.300',

        _dark: {
          color: '#85888E',
          borderColor: '#22262F',
          bgColor: '#22262F',
        },
      },
    },
    _focus: {
      bg: `${colorScheme}.600`,
    },

    _disabled: {
      color: 'gray.400',
      bgColor: 'gray.200',
      borderColor: 'gray.300',

      _dark: {
        color: '#85888E',
        borderColor: '#22262F',
        bgColor: '#22262F',
      },
    },
  }
}

const outline2 = (props: any) => {
  const { colorScheme } = props
  return {
    color: `${colorScheme}.800`,
    border: '1px solid',
    borderColor: `${colorScheme}.300`,
    bgColor: 'transparent',

    _hover: {
      color: `${colorScheme}.800`,
      border: `${colorScheme}.300`,
      bgColor: `${colorScheme}.50`,

      _disabled: {
        color: 'gray.400',
        bgColor: 'white',
        borderColor: 'gray.200',
      },
    },

    _focus: {
      color: `${colorScheme}.700`,
      bordeColor: `${colorScheme}.300`,
      bgColor: 'transparent',
    },

    _disabled: {
      color: 'gray.400',
      bgColor: 'white',
      borderColor: 'gray.200',

      _dark: {
        color: '#85888E',
        borderColor: '#22262F',
        bgColor: 'transparent',
      },
    },
  }
}
const sm = defineStyle({
  px: '12px',
  py: '8px',
  borderRadius: '8px',
})
const md = defineStyle({
  px: '14px',
  py: '10px',
  fontSize: '14px',
  borderRadius: '8px',
})
const lg = defineStyle({
  px: '16px',
  py: '10px',
  fontSize: '18px',
  borderRadius: '8px',
})
const xl = defineStyle({
  px: '18px',
  py: '12px',
  fontSize: '18px',
  borderRadius: '8px',
})
const xl2 = defineStyle({
  px: '22px',
  py: '16px',
  fontSize: '22px',
  borderRadius: '10px',
})

export const Button = defineStyleConfig({
  variants: {
    solid,
    outline2,
  },
  sizes: {
    sm,
    md,
    lg,
    xl,
    xl2,
  },
})
