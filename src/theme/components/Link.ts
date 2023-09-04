import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  color: 'link.primary',
})

const button = defineStyle((props) => {
  const { colorScheme } = props

  // Simulating the styles of a button variant rounded as we do in the "button" file,
  // but since Chakra doesn't default to passing a colorScheme to Links, we need to fallback to the base gray color of the buttons.
  // By default the color is white and if we want to change ir we can use the color prop
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    borderRadius: 'md',
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,
    color: 'white',
    bgColor: colorScheme ? `${colorScheme}.500` : 'gray.100',

    _hover: {
      textDecoration: 'none',
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.200',
    },

    _active: {
      bgColor: colorScheme ? `${colorScheme}.700` : 'gray.300',
    },
  }
})

const buttonGhost = defineStyle((props) => {
  const { colorScheme } = props

  //Similar to the case of "rounded" but without bgColor as a general style.
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    borderRadius: 'md',
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,

    _hover: {
      textDecoration: 'none',
      bgColor: colorScheme ? `${colorScheme}.500` : 'gray.100',
    },

    _active: {
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.200',
    },
  }
})

const rounded = defineStyle((props) => {
  const { colorScheme } = props

  // Simulating the styles of a button variant rounded as we do in the "button" file,
  // but since Chakra doesn't default to passing a colorScheme to Links, we need to fallback to the base gray color of the buttons.
  // By default the color is white and if we want to change ir we can use the color prop
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    borderRadius: 20,
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,
    color: 'white',
    bgColor: colorScheme ? `${colorScheme}.500` : 'gray.100',

    _hover: {
      textDecoration: 'none',
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.200',
    },

    _active: {
      bgColor: colorScheme ? `${colorScheme}.700` : 'gray.300',
    },
  }
})

const roundedGhost = defineStyle((props) => {
  const { colorScheme } = props

  //Similar to the case of "rounded" but without bgColor as a general style.
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    borderRadius: 20,
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,

    _hover: {
      textDecoration: 'none',
      bgColor: colorScheme ? `${colorScheme}.500` : 'gray.100',
    },

    _active: {
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.200',
    },
  }
})

export const Link = defineStyleConfig({
  variants: { button, 'button-ghost': buttonGhost, primary, rounded, 'rounded-ghost': roundedGhost },
})
