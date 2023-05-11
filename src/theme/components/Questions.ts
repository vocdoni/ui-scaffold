import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    mt: 5,
    mb: 14,
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },
  title: {
    mb: 0,
    fontSize: 'xl',
    fontWeight: 'bold',
  },

  description: {
    color: 'process.description',

    '& p': {
      mb: 0,
    },
  },

  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    minW: 72,
    maxW: 96,

    '& label': {
      position: 'relative',
      p: 0,

      '& span:first-of-type': {
        h: 10,
      },
      '& input:checked + span': {
        color: 'process.btn_form_selected.bg',
        border: 'none',
        bgColor: 'process.btn_form_selected.bg',

        _hover: {
          bg: 'process.btn_form_selected.bg',
        },
      },

      '& span:nth-of-type(2)': {
        position: 'absolute',
        m: 0,
        w: '100%',
      },
      '& input:checked ~ span:nth-of-type(2)': {
        color: 'process.btn_form_selected.color',
      },
    },
  },

  radio: {
    position: 'relative',
    w: '100%',
    height: 6,
    borderRadius: 6,
    border: 'none',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
  },
})

export const Questions = defineMultiStyleConfig({
  baseStyle,
})
