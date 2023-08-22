import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  color: 'link.primary',
})

const button = defineStyle((props) => {
  const { colorScheme } = props

  const commonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    height: 10,

    borderRadius: 'md',
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,

    _hover: {
      textDecoration: 'none',
    },
  }
  if (colorScheme === 'primary') {
    return {
      ...commonStyles,
      bgColor: `link.button.primary.500`,
      color: 'white',

      _hover: {
        ...commonStyles._hover,
        bgColor: `link.button.primary.600`,
      },

      _active: {
        bgColor: `link.button.primary.700`,
      },
    }
  }

  if (colorScheme === 'transparent') {
    return {
      ...commonStyles,

      _hover: {
        ...commonStyles._hover,
        bgColor: `link.button.transparent.600`,
      },

      _active: {
        bgColor: `link.button.transparent.700`,
      },
    }
  }

  if (colorScheme === 'primary-outlined') {
    return {
      ...commonStyles,
      border: '1px solid',
      borderColor: 'primary.main',
      color: 'primary.main',

      _hover: {
        ...commonStyles._hover,
      },

      _active: {},
    }
  }
  return {
    ...commonStyles,
    bgColor: `link.button.500`,
    _hover: {
      ...commonStyles._hover,
      bgColor: `link.button.600`,
    },

    _active: {
      bgColor: `link.button.700`,
    },
  }
})

export const Link = defineStyleConfig({
  variants: { button, primary },
})
