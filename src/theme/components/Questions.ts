import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  question: {
    width: '100%',
    maxW: 160,

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },

  header: {
    textAlign: 'center',
  },

  title: {
    fontWeight: 700,
    fontSize: '2xl',
    lineHeight: 7,
  },

  description: {
    color: 'questions_description',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    minW: 72,
    maxW: 96,
    mb: 10,
    mx: 'auto',

    '& label': {
      position: 'relative',
      p: 0,
      textAlign: 'center',

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

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
