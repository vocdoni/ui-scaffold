import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const solid = defineStyle((props) => {
  const { colorScheme } = props

  return {
    display: 'inline-flex',
    justifyContent: 'center',
    gap: 2,
    alignItems: 'center',
    bg: `${colorScheme}.500`,
    color: 'white',

    _hover: {
      bg: `${colorScheme}.600`,
    },
    _active: { bg: `${colorScheme}.700` },

    _dark: {
      color: 'black',

      bg: `${colorScheme}.200`,
      _hover: {
        bg: `${colorScheme}.300`,
      },
      _active: {
        bg: `${colorScheme}.400`,
      },
    },
  }
})
const outline = defineStyle((props) => {
  const { colorScheme } = props

  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    border: '1px solid',
    borderColor: colorScheme === 'whiteBlack' ? 'black' : `${colorScheme}.600`,
    color: colorScheme === 'whiteBlack' ? 'black' : `${colorScheme}.600`,
    textDecoration: 'none',

    _hover: {
      bgColor: colorScheme === 'whiteBlack' ? 'rgba(0, 0, 0, 0.02)' : `${colorScheme}.50`,
    },

    _active: {
      bgColor: colorScheme === 'whiteBlack' ? 'rgba(0, 0, 0, 0.06)' : `${colorScheme}.100`,
    },

    _dark: {
      borderColor: colorScheme === 'whiteBlack' ? 'white' : `${colorScheme}.200`,
      color: colorScheme === 'whiteBlack' ? 'white' : `${colorScheme}.200`,

      _hover: {
        bgColor: colorScheme === 'whiteBlack' ? 'rgba(0, 0, 0, 0.36)' : `${colorScheme}.800`,
      },
      _active: {
        bgColor: colorScheme === 'whiteBlack' ? 'rgba(0, 0, 0, 0.48)' : `${colorScheme}.900`,
      },
    },
  }
})

const transparent = defineStyle((props) => {
  const { colorScheme } = props

  return {
    gap: 2,
    color: colorScheme === 'colorMode' ? 'black' : `${colorScheme}.500`,

    _hover: {
      bgColor: colorScheme === 'colorMode' ? 'rgba(0, 0, 0, 0.03)' : `${colorScheme}.50`,
    },

    _active: {
      bgColor: colorScheme === 'colorMode' ? 'rgba(0, 0, 0, 0.05)' : `${colorScheme}.100`,
    },

    _dark: {
      color: colorScheme === 'colorMode' ? 'white' : `${colorScheme}.200`,

      _hover: {
        bgColor: colorScheme === 'colorMode' ? 'rgba(255, 255, 255, 0.08)' : `${colorScheme}.800`,
      },

      _active: {
        bgColor: colorScheme === 'colorMode' ? 'rgba(255, 255, 255, 0.16)' : `${colorScheme}.900`,
      },
    },
  }
})

const link = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: colorScheme === 'colorMode' ? 'black' : `${colorScheme}.500`,
    textDecoration: 'underline',
    _hover: {
      color: colorScheme === 'colorMode' ? 'black' : `${colorScheme}.600`,

      textDecoration: 'none',
    },
    _active: {
      color: colorScheme === 'colorMode' ? 'black' : `${colorScheme}.700`,
    },

    _dark: {
      color: colorScheme === 'colorMode' ? 'white' : `${colorScheme}.200`,
      _hover: {
        color: colorScheme === 'colorMode' ? 'white' : `${colorScheme}.400`,
      },
      _active: {
        color: colorScheme === 'colorMode' ? 'white' : `${colorScheme}.400`,
      },
    },
  }
})

const sizes = {
  xl2: defineStyle({
    px: '22px',
    py: '16px',
    borderRadius: '10px',
    fontSize: 'lg',
    fontWeight: 'semibold',
    h: '60px',
  }),
  xl: defineStyle({
    px: '18px',
    py: '12px',
    borderRadius: '8px',
    fontSize: 'md',
    h: '48px',
  }),
  lg: defineStyle({
    px: '16px',
    py: '10px',
    borderRadius: '8px',
    fontSize: 'md',
    h: '44px',
  }),
  md: defineStyle({
    px: '14px',
    py: '10px',
    borderRadius: '8px',
    fontSize: 'sm',
    h: '40px',
  }),
  sm: defineStyle({
    px: '12px',
    py: '8px',
    borderRadius: '8px',
    fontSize: 'sm',
    h: '36px',
  }),
}

export const Button = defineStyleConfig({
  variants: {
    solid,
    outline,
    transparent,
    link,
  },
  sizes,
  defaultProps: {
    size: 'md',
    colorScheme: 'brand',
    variant: 'solid',
  },
})
