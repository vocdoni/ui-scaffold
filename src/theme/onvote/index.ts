import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { breakpoints } from './breakpoints'
import { colors, colorsBase } from './colors'
import { ElectionActions } from './components/Actions'
import { Alert } from './components/Alert'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { ConfirmModal } from './components/ConfirmModal'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { Link } from './components/Link'
import { Modal } from './components/Modal'
import { ElectionQuestions } from './components/Questions'
import { QuestionsConfirmation } from './components/QuestionsConfirmation'
import { ElectionResults } from './components/Results'
import { SpreadsheetAccess } from './components/SpreadSheet'
import { Stepper } from './components/Stepper'
import { Tabs } from './components/Tabs'
import { Textarea } from './components/Textarea'
import { fontSizes } from './font'
import { sizes } from './space'
import archivoBold from '/fonts/archivo/Archivo-Bold.ttf'
import archivo from '/fonts/archivo/Archivo.ttf'
import pixeloidSansBold from '/fonts/pixeloidsans/PixeloidSans-Bold.ttf'
import pixeloidSans from '/fonts/pixeloidsans/PixeloidSans.ttf'
import { Tag } from './components/Tag'

export const theme = extendTheme(vtheme, {
  styles: {
    global: {
      ':root': {
        '--box-shadow-btn': '0px 0px 5px -3px gray',
        '--box-shadow-banner': '7px 6px 6px -3px rgba(0,0,0,0.37)',
        '--box-shadow': '0px 2px 4px lightgray',
        '--box-shadow-darker': '0px 2px 4px #808080b5',
        '--box-shadow-question': '0px 2px 4px 0px #0000001A',
        '--vcd-gradient-primary': 'linear-gradient(to right, #24656e, #2c545a)',

        '@font-face': [
          {
            'font-family': 'pixeloidsans',
            src: `url('${pixeloidSans}') format('truetype')`,
            'font-weight': 'normal',
          },
          {
            'font-family': 'pixeloidsans',
            src: `url('${pixeloidSansBold}') format('truetype')`,
            'font-weight': 'bold',
          },
          {
            'font-family': 'Archivo',
            src: `url('${archivo}') format('truetype')`,
            'font-weight': 'normal',
          },
          {
            'font-family': 'Archivo',
            src: `url('${archivoBold}') format('truetype')`,
            'font-weight': 'bold',
          },
        ],
      },
      body: {
        fontFamily: '"Archivo", sans-serif',
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
    Tag,
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
