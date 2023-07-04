import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { colors, colorsBase } from './colors'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Link } from './components/Link'
import { Questions } from './components/Questions'
import { space } from './space'
import { Stepper } from './components/Stepper'
import { Alert } from './components/Alert'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'
import { Form } from './components/Form'
import { Tabs } from './components/Tabs'
import { Checkbox } from './components/Checkbox'

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
    Questions,
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
