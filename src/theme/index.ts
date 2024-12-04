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
          fontSize: '26px',
        },
        'h2[level="2"]': {
          fontSize: '23px',
        },
        'h3[level="3"]': {
          fontSize: '20px',
        },
        p: {
          fontSize: '18px',
        },
        li: {
          fontSize: '18px',
        },
        'li:last-of-type': {
          mb: '20px',
        },
        ul: {
          fontSize: '18px',
        },
        ol: {
          fontSize: '18px',
        },
        a: {
          fontSize: '18px',
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
    Tabs,
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
