import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { colors, colorsBase } from './colors'
import { sizes } from './space'
import { breakpoints } from './breakpoints'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { ElectionQuestions } from './components/Questions'
import { fontSizes } from './font'
import { ElectionResults } from './components/Results'
import { ElectionActions } from './components/Actions'
import { Stepper } from './components/Stepper'
import { Tabs } from './components/Tabs'
import { Textarea } from './components/Textarea'
import { Form } from './components/Form'
import { Checkbox } from './components/Checkbox'
import { Link } from './components/Link'
import { Alert } from './components/Alert'
import { SpreadsheetAccess } from './components/SpreadSheet'
import { ConfirmModal } from './components/ConfirmModal'
import { QuestionsConfirmation } from './components/QuestionsConfirmation'
import { Badge } from './components/Badge'
import { Modal } from './components/Modal'
import { Input } from './components/Input'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-btn': '0px 0px 5px -3px gray',
        '--box-shadow-banner': '7px 6px 6px -3px rgba(0,0,0,0.37)',
        '--box-shadow': '0px 2px 4px lightgray',
        '--box-shadow-darker': '0px 2px 4px #808080b5',
        '--vcd-gradient-primary': 'linear-gradient(to right, #24656e, #2c545a)',
      },
      '.process-create-title': {
        fontWeight: 'bold',
      },
    },
  },
  breakpoints,
  fontSizes,
  colors,
  sizes,
  components: {
    Alert,
    Badge,
    Button,
    Card,
    Checkbox,
    ConfirmModal,
    ElectionQuestions,
    ElectionResults,
    ElectionActions,
    Form,
    Input,
    Link,
    Modal,
    QuestionsConfirmation,
    Tabs,
    Textarea,
    SpreadsheetAccess,
    Stepper,
  },
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
