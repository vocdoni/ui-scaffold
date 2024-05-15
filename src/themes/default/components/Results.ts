import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    '&': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
    },
    '& > div:nth-of-type(1)': {
      display: 'none',
      p: 8,
      pt: 12,
      pb: 0,
      boxShadow: 'var(--box-shadow-process)',
      borderTopRadius: 'lg',
      bgColor: 'white',
    },
    '& > div:nth-of-type(2)': {
      boxShadow: 'var(--box-shadow-process)',
      borderRadius: 'lg',
      bgColor: 'white',
      p: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,

      '& p:nth-of-type(1)': {
        width: 'calc(100% - 170px)',
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
        borderRadius: 'md',
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
    borderRadius: 'lg',
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
    gap: '95px',
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
