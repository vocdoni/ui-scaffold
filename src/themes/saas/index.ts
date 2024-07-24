import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { shared } from '../shared'
import { CardComponent } from './additions/card/card'
import { badgeStyles } from './components/badge'
import { buttonStyles } from './components/button'
import { inputStyles } from './components/input'
import { linkStyles } from './components/link'
import { progressStyles } from './components/progress'
import { sliderStyles } from './components/slider'
import { switchStyles } from './components/switch'
import { textareaStyles } from './components/textarea'
import { breakpoints } from './foundations/breakpoints'
import { globalStyles } from './styles'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ...shared,
    },
  },
  breakpoints, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent, // card component
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: 'white',
      accentColorForeground: 'green',
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: 'white',
    accentColorForeground: 'green',
    borderRadius: 'medium',
  })
}
