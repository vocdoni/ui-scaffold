import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { colors } from './colors'
import { sizes } from './space'
import { breakpoints } from './breakpoints'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Questions } from './components/Questions'
import { fontSizes } from './font'
import { ElectionResults } from './components/Results'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-navbar': '0px 8px 24px rgba(0, 0, 0, 0.1)',
        '--vcd-gradient-brand': 'linear-gradient(to right, #9526FC, #2ED3BF)',
        '--vcd-gradient-brand-tr': 'linear-gradient(to top right, #8E00FF, #00DDB3)',
      },
    },
  },
  breakpoints,
  fontSizes,
  colors,
  sizes,
  components: {
    Card,
    Questions,
    Button,
    ElectionResults,
    Progress: {
      baseStyle: {
        track: {
          maxH: 3,
        },
        filledTrack: {
          bgColor: 'blue',
        },
      },
    },
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
