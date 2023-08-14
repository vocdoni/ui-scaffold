import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  color: 'link',
})

const button = defineStyle((props) => {
  const { colorScheme } = props

  const commonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    height: 10,
    color: 'white',
    bgColor: 'primary.main',
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
      bgColor: `primary.500`,

      _hover: {
        ...commonStyles._hover,
        bgColor: `primary.600`,
      },

      _active: {
        bgColor: `primary.700`,
      },
    }
  }
  return commonStyles
})

export const Link = defineStyleConfig({
  variants: { button, primary },
})
