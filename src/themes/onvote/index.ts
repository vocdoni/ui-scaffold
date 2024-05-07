import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { shared } from '../shared'
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
      ...shared,
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
      '.brand-theme': {
        fontFamily: 'pixeloidsans, monospace',
      },
      '.creating-process-img': {
        bgImage: '/assets/onvote-modal-submitting.png',
      },
      '.creating-process-check': {
        w: 6,
        h: 6,
        bgColor: 'primary.main',
      },
      '.md-sizes': {
        '& :first-of-type': {
          mt: 0,
        },
        'h2[level="1"]': {
          fontSize: '26px',
        },
        'h2[level="2"]': {
          fontSize: '23px',
        },
        'h3[level="3"]': {
          fontSize: '20px',
        },
        p: {
          fontSize: '18px',
        },
        li: {
          fontSize: '18px',
        },
        'li:last-of-type': {
          mb: '20px',
        },
        ul: {
          fontSize: '18px',
        },
        ol: {
          fontSize: '18px',
        },
        a: {
          fontSize: '18px',
        },
        pre: {
          'white-space': 'pre-wrap',
        },
      },
      '.process-create-title': {
        fontFamily: 'pixeloidsans, monospace',
        textTransform: 'uppercase',
        color: colors.process_create.title,
      },
      '.process-create-section': {
        border: '1px solid',
        borderColor: 'process_create.section_border',
      },
      '.site-wrapper': {
        width: 'full',
        m: '0 auto',
        maxW: 'site-width',

        px: {
          base: '10px',
          sm: '20px',
          md: '80px',
        },
      },
      '.voting-type': {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: { base: 'center', md2: 'stretch' },
        gap: { base: 10, md2: 5 },
        maxW: { md: '990px' },
        mx: 'auto',
        fontSize: 'sm',
        pb: { base: 24, lg: 64 },
        px: {
          base: '40px',
          md: '80px',
        },
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
