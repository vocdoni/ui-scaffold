import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { Accordion } from './components/accordion'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Card } from './components/card'
import { Checkbox, DetailedCheckbox } from './components/checkbox'
import { Form } from './components/Form'
import { ElectionTitle, Heading } from './components/heading'
import { Input } from './components/input'
import { Link } from './components/link'
import { Modal } from './components/modal'
import { Pagination } from './components/pagination'
import { ElectionQuestions } from './components/Questions'
import { Radio } from './components/radio'
import { ElectionResults } from './components/results'
import { Stepper } from './components/stepper'
import { Tabs } from './components/Tabs'
import { Text } from './components/text'
import { Textarea } from './components/textarea'
import { editor } from './editor'
import { spacing } from './space'
import { Tag } from './components/tag'
import { Menu } from './components/menu'
import { Alert } from './components/alert'
import { Table } from './components/table'
import { TabsResponsive } from './components/TabsResponsive'

export const theme = extendTheme(vtheme, {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      ...editor,
      ':root': {
        '--box-shadow': '0 0 10px #e3e3e3',
        '--box-shadow-dark-mode': '0 0 10px #101010',
      },
      '.brand-gradient': {
        bgGradient: 'linear-gradient(to bottom, #B5F492, #338B93)',
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
        },
        pre: {
          whiteSpace: 'pre-wrap',
        },
      },
    },
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
