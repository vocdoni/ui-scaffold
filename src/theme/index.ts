import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Card } from './components/Card'
import { Button } from './components/Button'
import { Questions } from './components/QuestionsForm'

const colors = {
  black: {
    c60: '#1A202C',
    c90: '#0f141c',
  },
  branding: {
    pink: '#E035D0',
    purple: '#892BE2',
    lightpurple1: '#EDE4F4',
    purple1: '#8428DA',
    purple2: '#6F1FB9',
    purple3: '#591699',
  },
}
const borderRadius = {
  radii: {
    none: '0',
    sm: '5px',
    md: '10px',
    lg: '20px',
  },
}

export const theme = extendTheme(vtheme, {
  colors,
  ...borderRadius,
  components: {
    Button,
    Card,
    Questions,
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
