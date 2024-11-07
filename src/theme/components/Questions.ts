import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'
import checkIcon from '/assets/check-icon.png'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  alert: {
    px: { base: 3, sm: 5 },
    py: 7,
    mb: '30px',
    borderRadius: '8px',
    color: 'process.questions.alert.color',
    bgColor: 'process.questions.alert.bg',
    display: 'grid',
    columnGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto auto',
    boxShadow: 'var(--box-shadow)',
    border: 'none',

    '& span': {
      color: 'white',
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
    width: { base: 'full', xl: '80%' },
    m: 0,
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
    lineHeight: 1.3,
    fontSize: 'xl !important',
    color: 'process.questions.title.light',

    _dark: {
      color: 'process.questions.title.dark',
    },
  },

  description: {
    px: 1,
    color: 'process.questions.description',
    textAlign: 'start',
    fontSize: 'md !important',

    '& a': {
      textDecoration: 'underline',
    },

    _dark: {
      color: 'process.questions.title.dark',
    },
  },

  stack: {
    '& label': {
      borderRadius: 'lg',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      w: { lg2: '99%' },
      _hover: {
        bgColor: 'process.questions.hover.light',

        _dark: {
          bgColor: 'process.questions.hover.dark',
        },
      },

      '& span:nth-of-type(1)': {
        display: { base: 'none', md: 'block' },
        position: 'absolute',
        width: '30px',
        height: '30px',
        background: 'transparent',
        ml: '10px',
        borderRadius: 'none',

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
          bgColor: 'process.questions.disabled.light',
          border: 'none',

          _dark: {
            bgColor: 'process.questions.disabled.dark',
          },
        },
      },
      '& span:nth-of-type(2)': {
        p: 2,
        pl: { md: 12 },
        m: 0,
        border: '1px solid lightgray',
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
