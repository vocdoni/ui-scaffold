import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const process = defineStyle({
  w: 'full',
  color: 'process.aside.vote_btn_color',
  borderRadius: 'full',
  fontSize: { base: 'sm', xl2: 'md' },
  bgColor: 'process.aside.vote_btn_bg',
})

const rounded = defineStyle((props) => {
  const { colorScheme } = props

  // Chakra defaults to using the gray colorScheme, utilizing .100 for the background, .200 for hover, and .300 for active states.
  // However, when a color scheme is provided, it employs the values 500/600/700.
  // We replicate the same approach: if a colorScheme is specified, we use the values 500/600/700; otherwise, we use gray.100/gray.200/gray.300.
  return {
    borderRadius: 'full',
    bgColor: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.100`,

    //By default, Chakra UI uses white color, and in the case of the gray colorScheme, it uses black. This can always be modified using the "color" prop.
    color: colorScheme !== 'gray' ? 'white' : 'black',

    _hover: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.200`,
    },

    _active: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`,
    },
  }
})

const roundedGhost = defineStyle((props) => {
  const { colorScheme } = props

  // The same as in "rounded," but without a default bgColor.
  return {
    borderRadius: 'full',
    bgColor: 'transparent',

    _hover: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.100`,
    },

    _active: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.200`,
    },
  }
})

export const Button = defineStyleConfig({
  variants: { process, rounded, 'rounded-ghost': roundedGhost },
})
