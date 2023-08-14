import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  color: 'link',
})

const button = defineStyle((props) => {
  const { colorScheme } = props

  const linkBtn = {
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
      ...linkBtn,
      bgColor: `primary.500`,

      _hover: {
        textDecoration: 'none',
        bgColor: `primary.600`,
      },

      _active: {
        bgColor: `primary.700`,
      },
    }
  }
  return {}
})

export const Link = defineStyleConfig({
  variants: { button, primary },
})
