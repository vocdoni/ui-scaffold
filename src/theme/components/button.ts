import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    bg: mode(`${colorScheme}.500`, 'button.dark.primary')(props),
    borderColor: mode(`${colorScheme}.500`, 'button.dark.primary')(props),
    color: 'button.variant.primary.color',
    _hover: {
      bg: mode(`${colorScheme}.600`, 'button.dark.secondary')(props),
      _disabled: {
        bg: mode('button.variant.primary.disabled.light.bg', 'button.variant.primary.disabled.dark.bg')(props),
        color: mode('button.variant.primary.disabled.light.color', 'button.variant.primary.disabled.dark.color')(props),
        borderColor: mode(
          'button.variant.primary.disabled.light.border',
          'button.variant.primary.disabled.dark.border'
        )(props),
        opacity: mode(1, 0.4)(props),
      },
    },
    _active: { bg: mode(`${colorScheme}.500`, 'button.dark.primary')(props) },
    _disabled: {
      bg: mode('button.variant.primary.disabled.light.bg', 'button.variant.primary.disabled.dark.bg')(props),
      color: mode('button.variant.primary.disabled.light.color', 'button.variant.primary.disabled.dark.color')(props),
      borderColor: mode(
        'button.variant.primary.disabled.light.border',
        'button.variant.primary.disabled.dark.border'
      )(props),
      opacity: mode(1, 0.4)(props),
    },
  }
})

const secondary = defineStyle((props) => {
  const { colorScheme } = props
  return {
    border: '1px solid',
    borderColor:
      colorScheme === 'gray'
        ? mode('button.variant.common.border_color.light', 'button.variant.common.border_color.dark')(props)
        : mode(`${colorScheme}.300`, 'button.variant.common.border_color.dark')(props),

    bgColor: mode('button.variant.common.bg.light', 'button.variant.common.bg.dark')(props),

    color:
      colorScheme === 'gray'
        ? mode('button.variant.common.color.light', 'button.variant.common.color.dark')(props)
        : mode(`${colorScheme}.700`, 'button.variant.common.color.dark')(props),

    _hover: {
      bgColor:
        colorScheme === 'gray'
          ? mode('button.variant.common.hover.bg.light', 'button.variant.common.hover.bg.dark')(props)
          : mode(`${colorScheme}.50`, 'button.variant.common.hover.bg.dark')(props),

      color:
        colorScheme === 'gray'
          ? mode('button.variant.common.color.light', 'button.variant.common.color.dark')(props)
          : mode(`${colorScheme}.800`, 'button.variant.common.color.dark')(props),

      _disabled: {
        borderColor: 'button.variant.common.disabled.border',
        color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
      },
    },
    _disabled: {
      borderColor: 'button.variant.common.disabled.border',
      color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
    },
  }
})

const tertiary = defineStyle((props) => {
  const { colorScheme } = props
  return {
    bgColor: mode('button.variant.common.bg.light', 'button.variant.teritary_and_link.bg')(props),

    color:
      colorScheme === 'gray'
        ? mode('button.variant.common.color.light', 'button.variant.common.color_gray_dark')(props)
        : mode(`${colorScheme}.700`, 'button.variant.teritary_and_link.color_dark')(props),

    _hover: {
      bgColor:
        colorScheme === 'gray'
          ? mode('button.variant.common.hover.bg.light', 'button.variant.common.hover.bg.dark')(props)
          : mode(`${colorScheme}.50`, 'button.variant.common.hover.bg.dark')(props),

      color:
        colorScheme === 'gray'
          ? mode('button.variant.common.color.light', 'button.variant.common.color.dark')(props)
          : mode(`${colorScheme}.800`, 'button.variant.teritary_and_link.color_hover')(props),

      _disabled: {
        color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
      },
    },
    _disabled: {
      color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
    },
  }
})

const link = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color:
      colorScheme === 'gray'
        ? mode('button.variant.common.color.light', 'button.variant.common.color_gray_dark')(props)
        : mode(`${colorScheme}.700`, 'button.variant.teritary_and_link.color_dark')(props),

    _hover: {
      color:
        colorScheme === 'gray'
          ? mode('button.variant.common.color.light', 'button.variant.common.color.dark')(props)
          : mode(`${colorScheme}.800`, 'button.variant.teritary_and_link.color_hover')(props),
      textDecoration: 'none',

      _disabled: {
        color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
      },
    },
    _disabled: {
      color: mode('button.variant.common.disabled.color.light', 'button.variant.common.disabled.color.dark')(props),
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
    secondary,
    tertiary,
    link,
  },
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'md',
    colorScheme: 'brand',
  },
})
