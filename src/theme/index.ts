import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { colors, colorsBase } from './colors'
import { Alert } from './components/Alert'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { Link } from './components/Link'
import { ElectionQuestions } from './components/Questions'
import { Stepper } from './components/Stepper'
import { Tabs } from './components/Tabs'
import { Textarea } from './components/Textarea'
import { space } from './space'

export const theme = extendTheme(vtheme, {
  colors,
  sizes: {
    ...space,
  },
  components: {
    Alert,
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    ElectionQuestions,
    Link,
    Tabs,
    Textarea,
    Stepper,
  },
})

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: colorsBase.brand.main,
      accentColorForeground: colorsBase.white,
      borderRadius: 'medium',
    })
  }

  return darkTheme({
    accentColor: colorsBase.brand.main,
    accentColorForeground: colorsBase.white,
    borderRadius: 'medium',
  })
}
