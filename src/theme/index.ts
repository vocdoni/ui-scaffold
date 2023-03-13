import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Card } from './components/Card'

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
    Card,
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
