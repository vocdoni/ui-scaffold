import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  description: {
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'gray',
  },

  radioGroup: {
    color: 'gray',
    '& > div > label > span:nth-of-type(1)': {
      display: 'none',
    },

    '& > div > label > span:nth-of-type(2)': {
      marginLeft: 0,
      color: 'gray',
      opacity: 1,
    },
    '& > div > label > span:nth-of-type(2):before': {
      content: '" "',
      display: 'inline-block',
      marginRight: 2,
      color: 'black',
      width: 1.5,
      height: 1.5,
      border: '2px solid',
      mt: 1,
    },
  },
  title: {
    marginBottom: 4,
    fontSize: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',

    '&:before': {
      content: '" "',
      display: 'inline-block',
      marginRight: 2,
      bgColor: 'black',
      width: 2,
      height: 2,
      borderRadius: '50%',
    },
  },
  wrapper: {
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
    },
    '& form > div': {
      mb: 0,
    },
    '& form > div > div > div:nth-of-type(1)': {
      mb: 4,
    },
  },
})

export const ElectionQuestions = defineMultiStyleConfig({
  baseStyle,
})
