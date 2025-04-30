import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = {
  minW: 0,
  fontWeight: 'bold',

  '& > span': {
    m: 0,
  },
}

const disabled = {
  bg: '#F5F5F5 !important',
  borderColor: '#E9EAEB !important',
  color: '#A4A7AE !important',
  opacity: 1,

  _hover: {
    bg: '#F5F5F5 !important',
    borderColor: '#E9EAEB !important',
    color: '#A4A7AE !important',
  },
}

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    bg: `${colorScheme}.600`,
    color: colorScheme === 'gray' ? 'black' : 'white',
    gap: 4,
    fontWeight: 500,

    _hover: {
      bg: `${colorScheme}.700`,
    },
    _active: {
      bg: `${colorScheme}.700`,
    },

    _disabled: {
      ...disabled,
    },

    '& svg': {
      h: 4,
      w: 4,
    },
  }
})

const outline = defineStyle((props) => {
  const { colorScheme } = props

  return {
    bg: 'transparent',
    color: colorScheme === 'gray' ? 'black' : `${colorScheme}.700`,
    borderColor: colorScheme === 'gray' ? 'rgb(229, 229, 229)' : `${colorScheme}.300`,
    gap: 4,
    fontWeight: 500,

    _hover: {
      bg: `${colorScheme}.50`,
      color: `${colorScheme}.800`,
      borderColor: `${colorScheme}.300`,
    },
    _active: {
      bg: `${colorScheme}.50`,
      color: `${colorScheme}.800`,
      borderColor: `${colorScheme}.300`,
    },

    _disabled: {
      ...disabled,
      bgColor: 'white !important',
      borderColor: '#E9EAEB !important',

      _hover: {
        bgColor: 'white !important',
        borderColor: '#E9EAEB !important',
      },
    },
  }
})

const link = defineStyle((props) => {
  const { colorScheme } = props

  return {
    bg: 'transparent',
    color: `${colorScheme}.700`,
    borderRadius: '3px !important',

    _hover: {
      color: `${colorScheme}.800`,
      textDecoration: 'none',
    },
    _active: {
      color: `${colorScheme}.800`,
    },

    _disabled: {
      ...disabled,
      bgColor: 'white !important',
      borderColor: '#E9EAEB !important',

      _hover: {
        bgColor: 'white !important',
        borderColor: '#E9EAEB !important',
      },
    },
  }
})

const transparent = defineStyle((props) => {
  const { colorScheme } = props
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colorScheme === 'gray' ? 'black' : `${colorScheme}.700`,

    _hover: {
      bgColor: 'none',

      _disabled: {
        color: 'button.variant.common.disabled.color.light',
        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },
    },

    _disabled: {
      color: 'button.variant.common.disabled.color.light',
      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _active: {
      fontWeight: 'bold',
    },
  }
})

const underline = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: colorScheme === 'gray' ? 'black' : `${colorScheme}.700`,
    textDecoration: 'underline',

    _hover: {
      bgColor: colorScheme === 'gray' ? 'gray.200' : `${colorScheme}.50`,

      _disabled: {
        color: 'button.variant.common.disabled.color.light',
        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.50`,
      },
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',
      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      color: colorScheme === 'gray' ? 'white' : `${colorScheme}.700`,
    },
  }
})

const sizes = {
  xl2: defineStyle({
    px: '22px',
    py: '16px',
    borderRadius: 'lg',
    fontSize: 'lg',
    fontWeight: 'semibold',
    gap: '8px',
    h: '60px',
  }),
  xl: defineStyle({
    px: '18px',
    py: '12px',
    borderRadius: 'md',
    fontSize: 'md',
    gap: '6px',
    h: '48px',
  }),
  lg: defineStyle({
    px: '16px',
    py: '10px',
    borderRadius: 'md',
    fontSize: 'md',
    gap: '6px',
    h: '44px',

    '& svg': {
      h: 4,
      w: 4,
    },
  }),
  md: defineStyle({
    px: '14px',
    py: '10px',
    borderRadius: 'md',
    fontSize: 'sm',
    gap: '4px',
    h: '40px',

    '& svg': {
      h: 4,
      w: 4,
    },
  }),
  sm: defineStyle({
    px: '12px',
    py: '8px',
    borderRadius: 'md',
    fontSize: 'sm',
    gap: '4px',
    h: '36px',

    '& svg': {
      h: 4,
      w: 4,
    },
  }),
  xs: defineStyle({
    px: '12px',
    py: '8px',
    borderRadius: 'sm',
    fontSize: 'sm',
    gap: '4px',
    h: '32px',

    ':has(> svg:only-child)': {
      w: '28px',

      '& svg': {
        h: 4,
        w: 4,
      },
    },
  }),
}

export const Button = defineStyleConfig({
  variants: {
    primary,
    outline,
    transparent,
    link,
    underline,
  },
  baseStyle,
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'md',
    colorScheme: 'black',
  },
})
