import {createMultiStyleConfigHelpers} from '@chakra-ui/react'
import {questionsAnatomy} from '@vocdoni/chakra-components'
import checkIcon from '/assets/check-icon.svg'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  alert: {
    px: { base: 3, sm: 5 },
    py: 7,
    mb: '30px',
    color: 'process.questions.alert.color',
    bgColor: 'process.questions.alert.bg',
    display: 'grid',
    columnGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto auto auto',
    boxShadow: 'var(--box-shadow-darker)',
    border: 'none',
    borderRadius: 0,
    maxW: '900px',

    '& span': {
      color: 'white',
      ml: { base: 2, lg: 10, xl: 2 },
      gridRow: { base: '1/2', sm: '1/3' },
      gridColumn: { base: '1/3', sm: '1/2' },
      mx: 'auto',
    },
  },

  alertTitle: {
    fontSize: 'lg',
    mb: 3,
    whiteSpace: 'wrap',
    gridRow: { base: '2/3', sm: '1/2' },
    gridColumn: { base: '1/3', sm: '2/3' },
  },

  alertDescription: {
    display: 'flex',
    gap: 2,
    flexDirection: { base: 'column', lg2: 'row' },
    justifyContent: 'center',
    alignItems: { md: 'center' },
    whiteSpace: { base: 'pre-wrap', lg2: 'nowrap' },
    gridRow: { base: '3/4', sm: '2/3' },
    gridColumn: { base: '1/3', sm: '2/3' },
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
      minH: '300px',
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
    px: 1,
    display: 'block',
    textAlign: 'start',
    fontSize: 'xl2',
    lineHeight: 1.3,
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
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      w: { lg2: '99%' },

      '& span:nth-of-type(1)': {
        display: { base: 'none', md: 'block' },
        width: '30px',
        height: '30px',
        borderRadius: 'none',
        ml: '5px',

        '&[data-checked=""]': {
          '&:before': {
            display: 'none',
            bgColor: 'transparent',
          },

          border: 'none',
          background: 'process.questions.question_selected.bg',
          borderColor: 'process.questions.question_selected.bg',
          bgSize: '20px',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          bgImage: checkIcon,

          _hover: {
            border: 'none',
            background: 'process.questions.question_selected.bg',
            borderColor: 'process.questions.question_selected.bg',
            bgSize: '20px',
            bgRepeat: 'no-repeat',
            bgPosition: 'center',
            bgImage: checkIcon,
          },
        },
      },
      '& span:nth-of-type(2)': {
        p: 4,
        m: 0,
        border: '1px solid lightgray',
        w: '100%',
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

  abstainBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'primary.main',
    bgColor: 'gray.100',
    borderRadius: 'full',
    px: '4',
    py: '1',
    border: '2px solid',
    borderColor: 'primary.main',
    width: '2em',
    height: '2em',
    minW: 'max-content'
  },

  error: {
    display: 'flex',
    justifyContent: 'center',
  },
})

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
