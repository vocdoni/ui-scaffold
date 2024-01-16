import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { breakpoints } from './breakpoints'
import { colors, colorsBase } from './colors'
import { components } from './components'
import { fontSizes } from './font'
import { sizes } from './space'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-btn': '0px 0px 5px -3px gray',
        '--box-shadow-banner': '7px 6px 6px -3px rgba(0,0,0,0.37)',
        '--box-shadow': '0px 2px 4px lightgray',
        '--box-shadow-darker': '0px 2px 4px #808080b5',
        '--vcd-gradient-primary': 'linear-gradient(to right, #24656e, #2c545a)',
      },
      '.voting-type': {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: { base: 'center', md2: 'stretch' },
        gap: { base: 10, md2: 0 },
        mb: 32,
        maxW: '1250px',
        mx: 'auto',
      },
      link: {
        color: 'link.primary',
        textDecoration: 'underline',
        _hover: {
          textDecoration: 'none',
        },
      },
      '.process-create-title': {
        fontWeight: 'bold',
      },
      '.site-wrapper': {
        width: 'full',
        m: '0 auto',
      },
      '.creating-process': {
        bgImage: '/assets/spreadsheet-confirm-modal.jpg',
      },
    },
  },
  breakpoints,
  fontSizes,
  colors,
  sizes,
  components,
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: colorsBase.white.pure,
      accentColorForeground: colorsBase.primary.main,
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: colorsBase.white.pure,
    accentColorForeground: colorsBase.primary.main,
    borderRadius: 'medium',
  })
}
