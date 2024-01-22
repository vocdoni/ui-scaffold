import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  description: {
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'process_create.description',
    marginBottom: 0,
  },

  radioGroup: {
    '& > div': {
      gap: 0,
    },
    '& > div > label > span:nth-of-type(1)': {
      display: 'none',
    },

    '& > div > label > span:nth-of-type(2)': {
      marginLeft: 0,
      color: 'process_create.description',
      opacity: 1,
    },
    '& > div > label > span:nth-of-type(2):before': {
      content: '" "',
      display: 'inline-block',
      marginRight: 2,
      color: 'process_create.preview_option_question_before',
      width: 1.5,
      height: 1.5,
      border: '2px solid',
      mt: 1,
    },
  },
  question: {
    bgColor: 'process_create.bg',
    borderRadius: 'md',
    mb: 5,

    '& > div': {
      p: 2,
    },
    '&:last-of-type': {
      mb: 0,
    },
  },
  title: {
    marginBottom: 0,
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },

  wrapper: {
    '& form > div': {
      pt: 0,
      pl: 0,
      pb: 0,

      '& div:nth-of-type(2) > div': {
        mt: 2,

        '& > div > p': {
          mb: 2,
        },
      },
    },
  },
})

export const PreviewQuestions = defineMultiStyleConfig({
  baseStyle,
})
