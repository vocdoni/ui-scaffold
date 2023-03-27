import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Questions } from './components/QuestionsForm'

const colors = {
  black: {
    c60: '#1A202C',
    c90: '#0f141c',
  },
  branding: {
    turquoise: '#52E4C2',
    blue: '#1752FE',
    pink: '#E035D0',
    purple: '#892BE2',
    lightpurple: '#EDE4F4',
  },
}

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--vcd-gradient-brand': 'linear-gradient(to right, #9526FC, #2ED3BF)',
      },
    },
  },
  colors,
  components: {
    Button,
    Card,
    Questions,
  },
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: '#9526FC',
      accentColorForeground: 'white',
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: '#9526FC',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  })
}
