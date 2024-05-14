import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    opacity: '0.8',
    '&': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
    },
    '& > div:nth-of-type(1)': {
      '& > p': {
        display: 'none',
      },
    },
    '& > div:nth-of-type(2)': {
      boxShadow: 'var(--box-shadow-process)',
      bgColor: 'white',
      p: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexWrap: 'wrap',
      '& p:nth-of-type(1)': {
        width: { base: '50%', lg2: '100px' },
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& p:nth-of-type(2)': {
        ml: 'auto',
      },
      '& div': {
        w: 'full',
        h: 4,
        overflow: 'hidden',
        position: 'relative',

        '& div': {
          h: 4,
          backgroundColor: 'process.bar',
        },
      },

      '& > div:nth-of-type(2) > div:last-of-type': {
        mb: 0,
      },
    },
  },

  secret: {
    px: 5,
    py: 5,
    my: '75px',
    color: 'process.results.alert_color',
    bgColor: 'process.results.alert_bg',
    boxShadow: 'var(--box-shadow-process)',
    whiteSpace: 'wrap',
  },

  title: {
    fontWeight: 700,
    fontSize: 'xl',
    lineHeight: 7,
    color: 'process.results.title',
    textAlign: { base: 'center', md: 'start' },
    mb: 3,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '73px',
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
