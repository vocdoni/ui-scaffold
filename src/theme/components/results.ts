import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    gap: 6,
  },
  body: {
    fontWeight: 'bold',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      mb: 3,
    },
  },
  header: {
    mb: 4,
  },
  choiceTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 'sidebar',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    pl: 2,
    fontSize: 'sm',
  },
  choiceVotes: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 'sidebar',
    display: 'flex',
    alignItems: 'center',
    pr: 2,
    fontSize: 'sm',
    color: 'black',
  },
  progress: {
    h: 8,
    zIndex: 'background',
    bg: 'gray.100',
    borderRadius: 'sm',
    '& > div': {
      bg: 'gray.400',
      borderRadius: 'sm',
    },
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
