import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const process = defineStyle({
  w: 'full',
  color: 'process.aside.vote_btn_color',
  borderRadius: 'full',
  fontSize: { base: 'sm', xl2: 'md' },
  bgColor: 'process.aside.vote_btn_bg',
})

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    borderRadius: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    bgColor: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.100`,

    color: colorScheme !== 'gray' ? 'white' : 'black',

    _hover: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.200`,
    },

    _active: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`,
    },
  }
})

const secondary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    borderRadius: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    bgColor: 'gray.100',
    color: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.300`,

    _hover: {
      bgColor: 'gray.200',
      color: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.300`,
    },

    _active: {
      bgColor: 'gray.300',
      color: colorScheme !== 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`,
    },
  }
})
const transparent = defineStyle((props) => {
  return {
    bgColor: 'transparent',

    _hover: {
      bgColor: 'transparent',
    },
    _active: {
      bgColor: 'transparent',
    },

    _disabled: {},
  }
})

const icon = defineStyle((props) => {
  const { colorScheme } = props

  return {
    color: `${colorScheme}.600`,
    bgColor: 'transparent',

    _hover: {
      bgColor: `${colorScheme}.500`,
      color: 'white',
    },
    _active: {
      bgColor: `${colorScheme}.700`,
      color: 'white',
    },

    _disabled: {},
  }
})
export const Button = defineStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  variants: { icon, process, primary, secondary, transparent },
})
