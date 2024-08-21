import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { shared } from '../shared'
import { CardComponent } from './additions/card/card'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Input } from './components/input'
import { Link } from './components/link'
import { progressStyles } from './components/progress'
import { sliderStyles } from './components/slider'
import { switchStyles } from './components/switch'
import { textareaStyles } from './components/textarea'
import { breakpoints } from './foundations/breakpoints'
import { globalStyles, colors } from './styles'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ...shared,
      '.site-wrapper': {
        width: 'full',
        m: '0 auto',
        maxW: '1920px',

        px: {
          base: '10px',
          sm: '20px',
          md: '80px',
        },
      },
    },
  },
  breakpoints, // Breakpoints
  globalStyles,
  components: {
    Badge,
    Button,
    Input,
    Link,
  },
  colors,
  // badgeStyles, // badge styles
  // buttonStyles, // button styles
  // linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  // inputStyles, // input styles
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
