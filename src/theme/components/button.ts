import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    bg: `${colorScheme}.600`,
    borderColor: `${colorScheme}.600`,
    color: 'button.variant.primary.color',
    _hover: {
      bg: `${colorScheme}.700`,
      borderColor: `${colorScheme}.700`,
      _disabled: {
        bg: 'button.variant.primary.disabled.light.bg',
        color: 'button.variant.primary.disabled.light.color',
        borderColor: 'button.variant.primary.disabled.light.border',
        opacity: 1,
        _dark: {
          bg: 'button.variant.primary.disabled.dark.bg',
          color: 'button.variant.primary.disabled.dark.color',
          borderColor: 'button.variant.primary.disabled.dark.border',
          opacity: 0.4,
        },
      },
    },
    _active: { bg: `${colorScheme}.500` },
    _disabled: {
      bg: 'button.variant.primary.disabled.light.bg',
      color: 'button.variant.primary.disabled.light.color',
      borderColor: 'button.variant.primary.disabled.light.border',
      opacity: 1,
      _dark: {
        bg: 'button.variant.primary.disabled.dark.bg',
        color: 'button.variant.primary.disabled.dark.color',
        borderColor: 'button.variant.primary.disabled.dark.border',
        opacity: 0.4,
      },
    },
  }
})
const outline = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    borderColor: colorScheme === 'gray' ? 'button.variant.common.border_color.light' : `${colorScheme}.600`,
    color: colorScheme === 'gray' ? 'button.variant.common.color.light' : `${colorScheme}.600`,

    _hover: {
      bgColor: colorScheme === 'gray' ? 'button.variant.common.hover.bg.light' : `${colorScheme}.700`,
      borderColor: colorScheme === 'gray' ? 'button.variant.common.border_color.light' : `${colorScheme}.700`,
      color: colorScheme === 'gray' ? 'button.variant.common.color.light' : 'button.variant.outline.color',

      _disabled: {
        borderColor: 'button.variant.common.disabled.border',
        color: 'button.variant.common.disabled.color.light',

        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },
    },
    _disabled: {
      borderColor: 'button.variant.common.disabled.border',
      color: 'button.variant.common.disabled.color.light',

      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      color: colorScheme === 'gray' ? 'button.variant.common.color.light' : 'button.variant.outline.color',

      _hover: {
        bgColor: colorScheme === 'gray' ? 'button.variant.common.hover.bg.light' : `${colorScheme}.700`,
      },
    },
  }
})

const transparent = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: colorScheme === 'gray' ? 'button.variant.common.color.light' : `${colorScheme}.700`,

    _hover: {
      bgColor: colorScheme === 'gray' ? 'button.variant.common.hover.bg.light' : `${colorScheme}.50`,

      color: colorScheme === 'gray' ? 'button.variant.common.color.light' : `${colorScheme}.800`,

      _disabled: {
        color: 'button.variant.common.disabled.color.light',
        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        bgColor: colorScheme === 'gray' ? 'button.variant.common.hover.bg.dark' : `${colorScheme}.50`,
        color: colorScheme === 'gray' ? 'button.variant.common.color.dark' : `${colorScheme}.800`,
      },
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',
      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      color: colorScheme === 'gray' ? 'button.variant.common.color_gray_dark' : `${colorScheme}.700`,
    },
  }
})

const link = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: colorScheme === 'gray' ? 'button.variant.common.color.light' : `${colorScheme}.700`,

    _hover: {
      color: colorScheme === 'gray' ? 'button.variant.common.color.light' : `${colorScheme}.800`,
      textDecoration: 'none',

      _disabled: {
        color: 'button.variant.common.disabled.color.light',

        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        color: colorScheme === 'gray' ? 'button.variant.common.color.dark' : `${colorScheme}.800`,
      },
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',

      _dark: {
        color: 'button.variant.common.disabled.color.light',
      },
    },

    _dark: {
      color: colorScheme === 'gray' ? 'button.variant.common.color.dark' : `${colorScheme}.700`,
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
    primary,
    outline,
    transparent,
    link,
  },
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'md',
    colorScheme: 'brand',
  },
})
