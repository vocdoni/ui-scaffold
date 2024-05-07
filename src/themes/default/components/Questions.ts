import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'
import checkIcon from '/assets/check-icon.png'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  alert: {
    px: { base: 3, sm: 5 },
    py: 7,
    mb: '30px',
    borderRadius: 'lg',
    color: 'process.results.alert_color',
    bgColor: 'process.results.alert_bg',
    display: 'grid',
    columnGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto auto',
    boxShadow: 'var(--box-shadow-process)',
    border: 'none',

    '& span': {
      color: 'process.results.alert_color',
      ml: { base: 2, lg: 10, xl: 2 },
      gridRow: '1/3',
      gridColumn: '1/2',
    },
  },

  alertTitle: {
    fontSize: 'lg',
    mb: 3,
  },

  alertDescription: {
    display: 'flex',
    gap: 2,
    flexDirection: { base: 'column', lg2: 'row' },
    justifyContent: 'center',
    alignItems: { md: 'center' },
    whiteSpace: { base: 'pre-wrap', lg2: 'nowrap' },
  },

  alertLink: {
    display: 'block',
    w: '100%',
    px: 2,
    py: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'process.results.alert_color',
    bgColor: 'process.results.alert_bg',
    fontSize: 'sm',

    _hover: {
      textDecoration: 'none',
    },
  },

  wrapper: {
    '& > form': {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,

      '& > div > div:first-of-type': {
        '& > div:first-of-type': {
          mb: 5,
          padding: '2px 12px',
          fontSize: '11px',
          lineHeight: '20px',
          border: '1px solid #ccc',
        },
      },
    },
  },

  question: {
    m: 0,
    w: { base: 'full', lg2: '80%' },
    mx: 'auto',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  },

  title: {
    display: 'block',
    textAlign: 'start',
    fontSize: 'xl2',
    lineHeight: 1.3,
    color: 'process.questions.title',
    mb: 5,
  },

  description: {
    px: 1,
    color: 'process.questions.description',
    textAlign: 'start',
    fontSize: 'xl',
    mb: '50px',
  },

  stack: {
    '& label': {
      boxShadow: 'var(--box-shadow-process-questions)',
      bgColor: 'process.label',
      borderRadius: 'lg',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 2,

      w: { lg2: '99%' },
      _hover: {
        bgColor: '#eee',
      },

      '& span:nth-of-type(1)': {
        display: { base: 'none', md: 'block' },
        position: 'absolute',
        width: '30px',
        height: '30px',
        background: 'transparent',
        ml: '10px',
        borderRadius: 'none',
        border: '1px solid',
        borderColor: 'lightgray',

        '&[data-checked=""]': {
          '&:before': {
            display: 'none',
            bgColor: 'transparent',
          },

          background: 'process.questions.question_selected.bg',
          borderColor: 'white',
          borderWidth: '1px',
          bgSize: '15px',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          bgImage: checkIcon,

          _hover: {
            border: 'none',
            background: 'process.questions.question_selected.bg',
            borderColor: 'process.questions.question_selected.bg',
            bgSize: '15px',
            bgRepeat: 'no-repeat',
            bgPosition: 'center',
            bgImage: checkIcon,
          },
        },

        '&[data-disabled=""]': {
          // bgColor: 'white !important',
          // border: 'none !important',
        },
      },
      '& span:nth-of-type(2)': {
        p: 2,
        pl: { md: 12 },
        py: 4,
        m: 0,
        w: '100%',
        borderRadius: 'lg',
      },

      '& input:checked ~ span:nth-of-type(2)': {
        color: 'process.questions.question_selected.color',
        bgColor: 'process.questions.question_selected.bg',
        w: '100%',
      },
    },
  },

  radio: {
    borderRadius: 'full !important',
  },

  checkbox: {
    // Checkbox label style
    '& span:nth-of-type(2)': {
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'space-between',
      justifyItems: 'center',
      alignItems: 'center',
    },
  },

  error: {
    display: 'flex',
    justifyContent: 'center',
  },
})

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
