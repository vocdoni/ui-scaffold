import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/react-components'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Questions } from './components/QuestionsForm'

export const colorsBase = {
  lightBlue: '#F2F5FF',
  black: '#000000',
  blue: '#1752FE',
  grenade: '#961D1D',
  pink: {
    ultralight: '#EA7BDF',
    light: '#E55BD8',
    normal: '#E035D0',
  },
  lightpurple: '#EDE4F4',
  purple: '#892BE2',
  turquoise: '#52E4C2',
  white: '#ffffff',
}

const colors = {
  ...colorsBase,
  aside: {
    card: colorsBase.purple,
  },
  buttons: {
    primary: {
      500: colorsBase.pink.normal,
      600: colorsBase.pink.ultralight,
      700: colorsBase.pink.light,
    },
  },
  form: {
    
  },
  home: {
    background: colorsBase.lightBlue,
  },
  list: {
    card: {
      type: colorsBase.blue,
      created_date: colorsBase.turquoise,
      process_canceled: colorsBase.grenade,
    },
  },
  header: {
    organization: {
      button_address_active: 'white',
      link: colorsBase.pink.normal,
      read_more: colorsBase.pink.normal,
    },
  },
  pink: {
    50: colorsBase.pink.normal,
    600: colorsBase.pink.ultralight,
  },
  process: {
    canceled: colorsBase.grenade,
    date: colorsBase.purple,
    secret_until_the_end: colorsBase.purple,
  },
  text_error: colorsBase.grenade,
}

const space = {
  84: '21rem',
  88: '22rem',
  100: '25rem',
  124: '31rem',
  132: '33rem',
  160: '40rem',
  250: '62.5rem',
  304: '76rem',
  350: '87.5rem',
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
  sizes: {
    ...space,
  },
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
