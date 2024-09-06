import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { shared } from '../shared'
import { CardComponent } from './additions/card/card'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Input } from './components/input'
import { Link } from './components/link'
import { Modal } from './components/modal'
import { Card } from './components/card'
import { progressStyles } from './components/progress'
import { sliderStyles } from './components/slider'
import { switchStyles } from './components/switch'
import { textareaStyles } from './components/textarea'
import { breakpoints } from './foundations/breakpoints'
import { colors } from './colors'

export const theme = extendTheme(vtheme, {
  breakpoints,
  components: {
    Badge,
    Button,
    Card,
    Input,
    Link,
    Modal,
  },
  colors,
  progressStyles,
  sliderStyles,
  textareaStyles,
  switchStyles,
  CardComponent,
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
