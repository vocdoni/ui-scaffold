import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { shared } from '../shared'
import { CardComponent } from './additions/card/card'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Input } from './components/input'
import { Link } from './components/link'
import { Form } from './components/Form'
import { Modal } from './components/modal'
import { Card } from './components/card'
import { Checkbox } from './components/checkbox'
import { Textarea } from './components/textarea'
import { breakpoints } from './foundations/breakpoints'
import { colors } from './colors'
import { Pagination } from './components/pagination'
import { spacing } from './space'
import { Tabs } from './components/Tabs'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ...shared,
      '.brand-gradient': {
        bgGradient: 'linear-gradient(to bottom, #B5F492, #338B93)',
      },
    },
  },
  breakpoints,
  components: {
    Badge,
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Link,
    Modal,
    Pagination,
    Tabs,
    Textarea,
  },
  spacing,
  colors,
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
