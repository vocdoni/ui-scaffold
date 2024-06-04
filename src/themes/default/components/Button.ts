import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyles = {
  borderRadius: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
}
const solid = defineStyle((props) => {
  return {
    ...baseStyles,
  }
})
const secondary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...baseStyles,
    bgColor: 'gray.100',
    color: `${colorScheme}.500`,

    _hover: {
      bgColor: 'gray.200',
      color: `${colorScheme}.600`,

      _disabled: {
        bgColor: 'gray.100',
        color: `${colorScheme}.600`,
      },
    },

    _active: {
      bgColor: 'gray.300',
      color: `${colorScheme}.700`,
    },
  }
})
const outline = defineStyle((props) => {
  return {
    ...baseStyles,
  }
})
const ghost = defineStyle((props) => {
  return {
    ...baseStyles,
  }
})
const addressDropdown = defineStyle((props) => {
  return {
    ...baseStyles,
    minW: 40,
    bgColor: 'gray.100',

    _hover: {
      bgColor: 'gray.200',
    },

    _active: {
      bgColor: 'gray.300',
    },
  }
})
const transparent = defineStyle((props) => {
  const { colorScheme } = props

  return {
    bgColor: 'transparent',
    color: `${colorScheme}.500`,

    _hover: {
      bgColor: 'transparent',
      color: `${colorScheme}.600`,

      _disabled: {
        bgColor: 'transparent',
      },
    },
    _active: {
      bgColor: 'transparent',
      color: `${colorScheme}.700`,
    },
  }
})
const closeForm = defineStyle({
  bgColor: 'white',
  fontWeight: 'normal',
})
const goBack = defineStyle({
  bgColor: 'gray.100',

  _hover: {
    bgColor: 'gray.200',
  },

  _active: {
    bgColor: 'gray.300',
  },

  '& svg': {
    m: 0,
    w: 3.5,
  },
  '& span': {
    overflow: 'hidden',
    fontSize: 'sm',
    isTruncated: true,
    maxW: { base: '100px', md: '200px' },
    ml: 1,
  },
})

export const Button = defineStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  variants: {
    'address-dropdown': addressDropdown,
    'close-form': closeForm,
    outline,
    ghost,
    solid,
    'go-back': goBack,
    secondary,
    transparent,
  },
})
