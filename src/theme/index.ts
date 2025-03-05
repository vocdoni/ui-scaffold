import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { Accordion } from './components/accordion'
import { Alert } from './components/alert'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Card } from './components/card'
import { Checkbox, DetailedCheckbox } from './components/checkbox'
import { Form } from './components/Form'
import { ElectionTitle, Heading } from './components/heading'
import { Input } from './components/input'
import { Link } from './components/link'
import { Menu } from './components/menu'
import { Modal } from './components/modal'
import { Pagination } from './components/pagination'
import { ElectionQuestions } from './components/Questions'
import { Radio } from './components/radio'
import { ElectionResults } from './components/results'
import { SpreadsheetAccess } from './components/SpreadsheetAccess'
import { Stepper } from './components/stepper'
import { Table } from './components/table'
import { Tabs } from './components/Tabs'
import { TabsResponsive } from './components/TabsResponsive'
import { Tag } from './components/tag'
import { Text } from './components/text'
import { Textarea } from './components/textarea'
import { editor } from './editor'
import { spacing } from './space'

export const theme = extendTheme(vtheme, {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      ...editor,
      ':root': {
        '--box-shadow': '0 0 10px #e3e3e3',
        '--box-shadow-dark-mode': '0 0 10px #101010',
      },
      body: {
        bg: props.colorMode === 'dark' ? 'bg.dark' : 'bg.light',
      },
      '.md-sizes': {
        '& :first-of-type': {
          mt: 0,
        },
        'h2[level="1"]': {
          fontSize: '36px',
          lineHeight: '44px',
          letterSpacing: '-2%',
        },
        'h2[level="2"]': {
          fontSize: '30px',
          lineHeight: '38px',
          letterSpacing: '0%',
        },
        'h3[level="3"]': {
          fontSize: '24px',
          lineHeight: '32px',
          letterSpacing: '0%',
        },
        p: {
          fontSize: '16px',
          lineHeight: '24px',
        },
        li: {
          fontSize: '16px',
          lineHeight: '24px',
        },
        'li:last-of-type': {
          mb: '20px',
        },
        a: {
          fontSize: '16px',
          lineHeight: '24px',
          textDecoration: 'underline',
          color: 'link',
        },
        pre: {
          whiteSpace: 'pre-wrap',
        },
      },
    }),
  },
  components: {
    Accordion,
    Alert,
    Badge,
    Button,
    Card,
    Checkbox,
    DetailedCheckbox,
    ElectionTitle,
    ElectionQuestions,
    ElectionResults,
    Form,
    Heading,
    Input,
    Link,
    Menu,
    Modal,
    Pagination,
    Radio,
    Stepper,
    SpreadsheetAccess,
    Table,
    Tabs,
    TabsResponsive,
    Tag,
    Text,
    Textarea,
  },
  breakpoints,
  spacing,
  colors,
  sizes: {
    'modal-stretch': 'calc(100% + var(--chakra-space-5)*2 + var(--chakra-space-6)*2)',
    'modal-stretch-lg': 'calc(100% + var(--chakra-space-10)*2 + var(--chakra-space-6)*2)',
  },
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
