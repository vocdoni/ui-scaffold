import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const colors = {
  black: {
    c60: '#1A202C',
    c90: '#0f141c',
  },
}

const variants = {
  organization: definePartsStyle({
    container: {
      width: '100%',
      maxW: '275px',
      padding: '12px',
      borderRadius: '10px',
      border: '1px solid lightgray',
      cursor: 'pointer',
      transition: 'background .3s ease-in-out',
      _hover: {
        transition: 'background .3s ease-in-out',
        backgroundColor: 'rgba(230, 230, 230, 0.8)',
      },
    },
    header: {
      padding: '0',
      overflow: 'hidden',
    },
    body: {
      py: '5px',
      px: '3px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '60px',
      paddingTop: '8px',
      fontSize: '.9em',
      fontWeight: 'bold',
    },
    footer: {
      py: '5px',
      px: '3px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '.8em',
    },
  }),
}

const cardTheme = defineMultiStyleConfig({ variants })

export const theme = extendTheme(vtheme, {
  colors,
  components: {
    Button: {
      variants: {
        ghost: {
          border: '1px solid',
          borderRadius: '20px',
          height: '25px',
          fontSize: '0.8em',
        },
      },
    },
    Card: cardTheme,
  },
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: '#78D8AA',
      accentColorForeground: 'white',
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: '#78D8AA',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  })
}
