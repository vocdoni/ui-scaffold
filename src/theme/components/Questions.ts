import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  alert: {
    mt: 4,
    borderRadius: 'md',
    color: 'questions.alert.color',
    bgColor: 'questions.alert.bg',

    '& span': {
      color: 'white',
    },
  },

  alertTitle: {
    mb: 1,
  },

  alertLink: {
    display: 'block',
    px: 2,
    py: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'questions.alert.link_color',
    backgroundColor: 'questions.alert.link_bg',

    _hover: {
      textDecoration: 'none',
    },
  },
  wrapper: {
    mt: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  question: {
    width: 'full',
    maxW: 160,
    mx: 'auto',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  },

  header: {
    minW: 0,
  },

  title: {
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    fontSize: 'xl',
  },

  description: {
    color: 'questions.description',
    textAlign: 'center',
    noOfLines: 3,
    overflow: 'hidden',
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
        px: 2,
        m: 0,
        w: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
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
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
})

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
