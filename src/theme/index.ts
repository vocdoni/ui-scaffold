import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { CardComponent } from './additions/card/card'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { Accordion } from './components/accordion'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Card } from './components/card'
import { Checkbox } from './components/checkbox'
import { Form } from './components/Form'
import { ElectionTitle, Heading } from './components/heading'
import { Input } from './components/input'
import { Link } from './components/link'
import { Modal } from './components/modal'
import { Pagination } from './components/pagination'
import { Radio } from './components/radio'
import { Stepper } from './components/stepper'
import { Tabs } from './components/Tabs'
import { Text } from './components/text'
import { Textarea } from './components/textarea'
import { editor } from './editor'
import { spacing } from './space'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ...editor,
      ':root': {
        '--box-shadow': '0px 2px 4px lightgray',
        '--box-shadow-darker': '0px 2px 4px #808080b5',
      },
      '.brand-gradient': {
        bgGradient: 'linear-gradient(to bottom, #B5F492, #338B93)',
      },
    },
  },
  components: {
    Accordion,
    Badge,
    Button,
    Card,
    Checkbox,
    ElectionTitle,
    Form,
    Heading,
    Input,
    Link,
    Modal,
    Pagination,
    Radio,
    Stepper,
    Tabs,
    Text,
    Textarea,
  },
  breakpoints,
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
