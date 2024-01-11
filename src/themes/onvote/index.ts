import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { breakpoints } from './breakpoints'
import { colors, colorsBase } from './colors'
import { components } from './components'
import { fontSizes } from './font'
import { sizes } from './space'

export { customStylesSelect, customStylesTokensSelect } from './tokenSelectStyles'
export { colors, fontSizes, sizes }

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-btn': '0px 0px 5px -3px gray',
        '--box-shadow-banner': '7px 6px 6px -3px rgba(0,0,0,0.37)',
        '--box-shadow': '0px 2px 4px lightgray',
        '--box-shadow-darker': '0px 2px 4px #808080b5',
        '--box-shadow-question': '0px 2px 4px 0px #0000001A',
        '--vcd-gradient-primary': 'linear-gradient(to right, #24656e, #2c545a)',
      },
      body: {
        fontFamily: '"Archivo", sans-serif',
        fontWeight: 'normal',
      },
      fonts: {
        heading: '"Archivo", sans-serif',
        body: '"Archivo", sans-serif',
      },
      '.process-create-title': {
        fontFamily: 'pixeloidsans, monospace',
        textTransform: 'uppercase',
        color: colors.process_create.title,
      },
      '.brand-theme': {
        fontFamily: 'pixeloidsans, monospace',
      },
      '.process-create-section': {
        border: '1px solid',
        borderColor: 'process_create.section_border',
      },
      '.process-create': {
        width: 'full',
        maxWidth: '1920px',
      },
      '.process-create > header': {
        padding: { base: '12px 40px', md: '24px 80px' },
      },
      '.process-create > main': {
        px: { base: '40px', md: '80px' },
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
