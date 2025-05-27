import { ColorMode, extendTheme } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { theme as vtheme } from '@vocdoni/chakra-components'
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
import { Popover } from './components/popover'
import { ElectionQuestions } from './components/Questions'
import { Radio } from './components/radio'
import { ElectionResults } from './components/results'
import { SpreadsheetAccess } from './components/SpreadsheetAccess'
import { Stepper } from './components/stepper'
import { Table } from './components/table'
import { Tabs } from './components/Tabs'
import { Tag } from './components/tag'
import { Text } from './components/text'
import { Textarea } from './components/textarea'
import { Tooltip } from './components/tooltip'
import { editor } from './editor'
import { radii } from './radius'

import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/index.css'
import { Progress } from './components/progress'

export const theme = extendTheme(vtheme, {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif`,
    heading: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif`,
    mono: `'Menlo', monospace`,
  },
  fontWeights: {
    bold: 500,
    bolder: 600,
    extrabold: 700,
  },
  styles: {
    global: (props) => ({
      ...editor,
      body: {
        bg: props.colorMode === 'dark' ? 'gray.650' : 'white',
      },
      ':root': {
        '--box-shadow': '0 0 10px #e3e3e3',
        '--box-shadow-dark-mode': '0 0 10px #101010',
        '--border': '1px solid rgb(228, 228, 231)',
        '--shadow-sm': '0 1px 2px 0 rgb(0 0 0/0.05)',
      },

      '.md-sizes': {
        '& :first-of-type': {
          mt: 0,
        },
        h1: {
          fontWeight: 600,
          fontSize: '36px',
          lineHeight: '44px',
          letterSpacing: '-2%',
          mb: '30px',
        },
        'h2[level="1"]': {
          fontWeight: 600,
          fontSize: '36px',
          lineHeight: '44px',
          letterSpacing: '-2%',
        },
        h2: {
          fontWeight: 600,
          fontSize: '30px',
          lineHeight: '38px',
          letterSpacing: '0%',
          mb: '25px',
        },
        'h2[level="2"]': {
          fontWeight: 600,
          fontSize: '30px',
          lineHeight: '38px',
          letterSpacing: '0%',
        },
        h3: {
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          letterSpacing: '0%',
          mb: '20px',
        },
        'h3[level="3"]': {
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          letterSpacing: '0%',
        },
        h4: {
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '28px',
          letterSpacing: '0%',
          mb: '20px',
        },
        p: {
          fontSize: '16px',
          lineHeight: '24px',
          mb: '20px',

          '&:not(:has(+ p, + ul, + ol, + blockquote, + li))': {
            mb: '60px',
          },
          '&:has(img:only-child)': {
            mb: 0,
          },
        },
        blockquote: {
          px: 6,
          mb: '20px',
          borderRadius: 'lg',

          '& em': {
            fontWeight: 600,
          },
          '& p:first-of-type': {
            mb: '10px',
          },
          '& p:last-of-type': {
            mb: 0,
          },
        },
        ul: {
          mb: '60px',
        },
        li: {
          fontSize: '16px',
          lineHeight: '24px',
          ml: '20px',
          '& p': {
            mb: '10px',
          },
        },
        'li:last-of-type': {
          mb: '60px',
        },
        ol: {
          fontSize: '16px',
          lineHeight: '24px',
          ml: '20px',
        },
        'ol:last-of-type': {
          mb: '60px',
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
        img: {
          '&:first-of-type': {
            maxW: { base: '100%', sm: '90%', sm2: '300px', lg: '450px' },
            float: { sm2: 'right' },
            borderRadius: '16px',
            'margin-bottom': '10px',
            'margin-left': { base: '0px', sm2: '20px' },
            mx: 'auto',
          },
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
    Popover,
    Progress,
    Radio,
    Stepper,
    SpreadsheetAccess,
    Table,
    Tabs,
    Tag,
    Text,
    Textarea,
    Tooltip,
  },
  colors,
  radii,
  sizes: {
    'modal-stretch': 'calc(100% + var(--chakra-space-5)*2 + var(--chakra-space-6)*2)',
    'modal-stretch-lg': 'calc(100% + var(--chakra-space-10)*2 + var(--chakra-space-6)*2)',
  },
  zIndices: {
    background: 0,
    sidebar: 1,
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
