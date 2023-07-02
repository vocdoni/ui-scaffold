import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { colors } from './colors'
import { sizes } from './space'
import { breakpoints } from './breakpoints'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { ElectionQuestions } from './components/Questions'
import { fontSizes } from './font'
import { ElectionResults } from './components/Results'
import { ElectionActions } from './components/Actions'
import { Stepper } from './components/Stepper'
import { Alert } from './components/Alert'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'
import { Form } from './components/Form'
import { Tabs } from './components/Tabs'
import { Checkbox } from './components/Checkbox'
import { Link } from './components/Link'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-navbar': '0px 8px 24px rgba(0, 0, 0, 0.1)',
        '--vcd-gradient-brand': 'linear-gradient(to right, #9526FC, #2ED3BF)',
        '--vcd-gradient-brand-hover': 'linear-gradient(to right,  #2ED3BF, #9526FC)',
        '--vcd-gradient-brand-active': 'linear-gradient(to right, #24aa9a, #7c03ec)',
        '--vcd-gradient-brand-tr': 'linear-gradient(to top right, #8E00FF, #00DDB3)',
        '--vcd-gradient-404': 'linear-gradient(to right, #8E00FF, #00DDB3)',
        '--vcd-gradien-progress-bar': 'linear-gradient(to right, #2ed3bf, #00624e)',
      },
    },
  },
  breakpoints,
  fontSizes,
  colors,
  sizes,
  components: {
    Alert,
    Button,
    Card,
    Checkbox,
    ElectionQuestions,
    ElectionResults,
    ElectionActions,
    Form,
    Input,
    Link,
    Tabs,
    Textarea,
    Stepper,
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
