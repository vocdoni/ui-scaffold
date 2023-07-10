import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  alert: {
    px: '15px',
    py: '30px',
    my: '10px',
    borderRadius: '8px',
    color: 'process.questions.alert.color',
    bgColor: 'process.questions.alert.bg',

    '& span': {
      color: 'white',
    },
  },

  alertTitle: {
    mb: 1,
  },

  alertDescription: {
    display: 'flex',
    flexDirection: 'column',
  },

  alertLink: {
    order: 1,
    display: 'block',
    px: 2,
    py: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'process.questions.alert.link_color',
    backgroundColor: 'process.questions.alert.link_bg',
    borderRadius: 'md',
    fontSize: 'sm',

    _hover: {
      textDecoration: 'none',
    },
  },

  wrapper: {
    '& > form': {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
  },

  question: {
    width: 'full',
    maxW: 160,
    m: 0,
    mx: 'auto',
    background: 'process.questions.bg',
    p: 8,
    borderRadius: 'md',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  },

  title: {
    px: 1,
    display: 'block',
    textAlign: 'start',
    fontSize: 'xl',
    color: 'process.questions.title',
  },

  description: {
    px: 1,
    color: 'process.questions.description',
    textAlign: 'start',
  },

  radioGroup: {
    p: 1,
  },
  stack: {
    '& label': {
      borderRadius: 'lg',
      overflow: 'hidden',
      mb: 4,
      boxShadow: 'var(--box-shadow-darker)',

      '& input:checked': {
        bgColor: 'red',
      },

      '& span:nth-of-type(2)': {
        p: 4,
        m: 0,
      },

      '& input:checked ~ span:nth-of-type(2)': {
        color: 'process.questions.btn_form_selected.color',
        bgColor: 'process.questions.btn_form_selected.bg',
        w: '100%',
      },
    },
  },

  radio: {
    display: 'none',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
})

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
