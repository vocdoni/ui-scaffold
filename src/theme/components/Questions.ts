import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    mb: '50px',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },
  title: {
    mb: 0,
  },

  description: {
    color: 'process.description',

    '& p': {
      mb: 0,
    },
  },

  stack: {
    minW: 72,
    maxW: 96,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,

    '& label': {
      position: 'relative',
      p: 0,

      '& input:checked + span': {
        color: 'process.btn_active',
        border: 'none',
        bgColor: 'process.btn_active',
      },

      '& span:nth-of-type(2)': {
        position: 'absolute',
        m: 0,
        w: '100%',
      },
    },
  },

  radio: {
    position: 'relative',
    w: '100%',
    height: 6,
    border: 'none',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
  },
})

export const Questions = defineMultiStyleConfig({
  baseStyle,
})
