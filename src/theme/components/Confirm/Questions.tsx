import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  description: {
    bgColor: 'process_create.bg',
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'process_create.preview.question_description',
    marginBottom: 0,
  },

  radioGroup: {
    bgColor: 'process_create.bg',
    '& > div': {
      gap: 0,
    },
    '& > div > label > span:nth-of-type(1)': {
      display: 'none',
    },

    '& > div > label > span:nth-of-type(2)': {
      marginLeft: 0,
      color: 'process_create.preview.option',
      opacity: 1,
    },
    '& > div > label > span:nth-of-type(2):before': {
      content: '" "',
      display: 'inline-block',
      marginRight: 2,
      color: 'process_create.preview.option_before_color',
      width: 1.5,
      height: 1.5,
      border: '2px solid',
      mt: 1,
    },
  },
  question: {
    bgColor: 'process_create.bg',
    mb: 5,
    '&:last-of-type': {
      mb: 0,
    },
  },
  title: {
    bgColor: 'process_create.bg',
    marginBottom: 0,
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },

  wrapper: {
    bgColor: 'process_create.bg',
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
