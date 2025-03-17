import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)
const baseStyle = (props: any) => {
  const { colorScheme } = props
  return {
    control: {
      borderRadius: 'full',

      _checked: {
        bgColor: `${colorScheme}.500`,
        borderColor: `${colorScheme}.500`,

        _hover: {
          bgColor: `${colorScheme}.700`,
          borderColor: `${colorScheme}.700`,
        },
      },

      _disabled: {
        borderColor: 'radio.disabled.light',

        _dark: {
          borderColor: 'radio.disabled.dark',
        },
      },

      _dark: {
        _checked: {
          bgColor: `${colorScheme}.200`,
          borderColor: `${colorScheme}.200`,

          _hover: {
            bgColor: `${colorScheme}.400`,
            borderColor: `${colorScheme}.400`,
          },
        },
      },
    },
    container: {
      alignItems: 'start',

      '& > span:last-of-type': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  }
}

const sm = definePartsStyle({
  control: {
    width: 4,
    height: 4,

    _checked: {
      _disabled: {
        borderWidth: 6,
      },
    },
  },
})

const md = definePartsStyle({
  control: {
    width: 5,
    height: 5,

    _checked: {
      _disabled: {
        borderWidth: 7,
      },
    },
  },
})

export const Radio = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    sm,
    md,
  },
  defaultProps: {
    colorScheme: 'brand',
  },
})
