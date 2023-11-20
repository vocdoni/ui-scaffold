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
    borderRadius: 'full',
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,
    color: colorScheme ? `${colorScheme}.50` : 'black',
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

const onVote = defineStyle((props) => {
  const { colorScheme } = props

  // Simulating the styles of a button variant rounded as we do in the "button" file,
  // but since Chakra doesn't default to passing a colorScheme to Links, we need to fallback to the base gray color of the buttons.
  // By default the color is white and if we want to change ir we can use the color prop
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,
    color: colorScheme ? `${colorScheme}.50` : 'black',
    bgColor: colorScheme ? `${colorScheme}.500` : 'gray.100',
    clipPath:
      'polygon(0% 5px, 5px 5px, 5px 0%, calc(100% - 5px) 0%, calc(100% - 5px) 5px, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 5px calc(100% - 5px), 0% calc(100% - 5px))',
    border: '5px solid',
    borderColor: colorScheme ? `${colorScheme}.500` : 'gray.100',
    fontFamily: 'pixeloid',

    _hover: {
      textDecoration: 'none',
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.200',
      borderColor: colorScheme !== 'gray' ? `${colorScheme}.600` : 'gray.200',
    },

    _active: {
      bgColor: colorScheme ? `${colorScheme}.600` : 'gray.300',
      borderColor: colorScheme !== 'gray' ? `${colorScheme}.700` : `gray.300`,
    },
  }
})
const onVoteGhost = defineStyle((props) => {
  const { colorScheme } = props

  //Similar to the case of "rounded" but without bgColor as a general style.
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    height: 10,
    px: 4,
    fontWeight: 'semibold',
    lineHeight: 1.2,
    clipPath:
      'polygon(0% 5px, 5px 5px, 5px 0%, calc(100% - 5px) 0%, calc(100% - 5px) 5px, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 5px calc(100% - 5px), 0% calc(100% - 5px))',
    fontFamily: 'pixeloid',
    border: '5px solid',
    borderColor: 'transparent',

    _hover: {
      textDecoration: 'none',
      bgColor: 'gray.300',
      borderColor: 'gray.300',
    },

    _active: {
      bgColor: 'gray.400',
      borderColor: 'gray.500',
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
    borderRadius: 'full',
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
  variants: {
    button,
    'button-ghost': buttonGhost,
    primary,
    'on-vote': onVote,
    'on-vote-ghost': onVoteGhost,
    rounded,
    'rounded-ghost': roundedGhost,
  },
})
