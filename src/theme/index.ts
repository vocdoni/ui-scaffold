import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Card } from './components/Card'
import { Questions } from './components/QuestionsForm'
import { colors } from './colors'
import { space } from './space'
import { Button } from './components/Button'
import { Link } from './components/Link'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--vcd-gradient-brand': 'linear-gradient(to right, #9526FC, #2ED3BF)',
      },
    },
  },
  colors,
  sizes: {
    ...space,
  },
  components: {
    Card,
    Questions,
    Button,
    Link,
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
