import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Card } from './components/Card'
import { Button } from './components/Button'

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
    Button,
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
