import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  // alert: {
  //   p: 8,
  //   my: 3,
  //   borderRadius: 'lg',
  //   color: 'process.questions.alert.color',
  //   bgColor: 'process.questions.alert.bg',
  //   display: 'grid',
  //   columnGap: 10,
  //   gridTemplateColumns: 'auto auto',
  //   gridTemplateRows: 'auto auto',
  //   border: '1px solid red',

  //   '& span': {
  //     color: 'white',
  //     gridRow: '1 / 2',
  //     gridColumn: '1 / 3',
  //   },
  // },

  // alertTitle: {
  //   gridRow: '1 / 2',
  //   gridColumn: '1 / 3',
  //   mb: 1,
  // },

  // alertDescription: {
  //   gridColumn: '1 / 3',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   '& a': {
  //     order: 2,
  //   },
  // },

  // alertLink: {
  //   mx: 'auto',
  //   display: 'block',
  //   px: 6,
  //   py: 1,
  //   my: 2,
  //   textOverflow: 'ellipsis',
  //   overflow: 'hidden',
  //   whiteSpace: 'nowrap',
  //   color: 'process.questions.alert.link_color',
  //   backgroundColor: 'process.questions.alert.link_bg',
  // borderRadius: '8px',
  // fontSize: 'sm',

  //   _hover: {
  //     textDecoration: 'none',
  //   },
  // },
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
    color: 'process.questions.description',
    textAlign: 'center',
    noOfLines: 3,
    overflow: 'hidden',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    w: '60%',
    maxW: 96,
    mb: 10,
    mx: 'auto',

    '& label': {
      position: 'relative',
      p: 0,
      textAlign: 'center',

      _hover: {
        boxShadow: '#808080b5 0px 2px 4px',
        borderRadius: 'lg',
      },
      _disabled: {
        boxShadow: 'none',
      },
      '& span:first-of-type': {
        h: 10,
      },

      '& input:checked + span': {
        color: 'process.questions.btn_form_selected.bg',
        border: 'none',
        bgColor: 'process.questions.btn_form_selected.bg',

        _hover: {
          bg: 'process.questions.btn_form_selected.bg',
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
        color: 'process.questions.btn_form_selected.color',
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
