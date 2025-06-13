import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle(({ colorScheme }) => {
  if (colorScheme === 'black') {
    return {
      track: {
        _focusVisible: {
          _dark: {
            boxShadow: `0 0 0 2px darkgray`,
          },
        },
      },
      thumb: {
        _dark: {
          bg: `${colorScheme}.600`,
        },
      },
    }
  }

  return {}
})

export const Switch = defineMultiStyleConfig({
  baseStyle,
})
