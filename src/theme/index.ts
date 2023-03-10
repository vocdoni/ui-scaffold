import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { cardAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const colors = {
  black: {
    c60: '#1A202C',
    c90: '#0f141c',
  },
  branding: {
    lightpink1: '#fcf5fc',
    lightpink2: '#f6e3f6',
    lightpink3: '#fadef7',
    lightpink4: '#ef9ae7',
    lightpink: '#f5beef',
    pink: '#E035D0',
    purple1: '#8428DA',
    purple2: '#6F1FB9',
    purple3: '#591699',
  },
}

const cardCommonStyles = {
  container: {
    width: '100%',
    padding: 0,
    borderRadius: '10px',
    border: '1px solid lightgray',
    cursor: 'pointer',
  },
  header: {
    padding: 0,
  },
  body: {
    padding: 0,
  },
  footer: {
    padding: 0,
  },
}

const variantsCards = {
  organization: definePartsStyle({
    ...cardCommonStyles,
    container: {
      ...cardCommonStyles.container,
      maxW: '275px',
      padding: '12px',
      transition: 'background .3s ease-in-out',
      _hover: {
        transition: 'background .3s ease-in-out',
        backgroundColor: 'rgba(230, 230, 230, 0.8)',
      },
    },
    header: {
      ...cardCommonStyles.header,
      overflow: 'hidden',
    },
    body: {
      ...cardCommonStyles.body,
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
      ...cardCommonStyles.footer,
      py: '5px',
      px: '3px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '.8em',
    },
  }),
  process: definePartsStyle({
    ...cardCommonStyles,
    container: {
      ...cardCommonStyles.container,
      maxW: '500px',
      display: 'flex',
      direction: 'column',
      px: '25px',
      py: '20px',
    },
    header: {
      ...cardCommonStyles.header,
      display: 'flex',
      justifyContent: 'space-between',
      gap: '7px',
    },
    body: {
      ...cardCommonStyles.body,
    },
    footer: {
      ...cardCommonStyles.footer,
    },
  }),
}

const cardTheme = defineMultiStyleConfig({ variants: variantsCards })

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
        underline: {
          border: 'none',
          bg: 'none',
          textDecoration: 'underline',
          color: 'branding.pink',
        },
        brandVote: {
          padding: '20px',
          height: '25px',
          backgroundColor: 'branding.pink',
          minWidth: 'none',
          bgGradient: 'linear(to-b, branding.lightpink3, branding.pink)',
          color: 'branding.lightpink1',
          _hover: {
            color: 'branding.pink',
            bgGradient:
              'linear(to-b, branding.lightpink2, branding.lightpink4)',
          },
          _active: {
            transform: 'scale(0.95)',
          },
        },
      },
    },
    Card: cardTheme,
  },
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: '#E035D0',
      accentColorForeground: 'white',
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: '#E035D0',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  })
}
