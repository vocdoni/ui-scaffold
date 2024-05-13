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
      display: 'none',
      '& > p': {
        '&:before': {
          content: '"Hello"',
        },
      },
    },
    '& > div:nth-of-type(2)': {
      boxShadow: 'var(--box-shadow-process)',
      borderRadius: 'lg',
      bgColor: 'white',
      px: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,

      '& p:nth-of-type(1)': {
        flexGrow: 1,
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
        bgColor: 'results.progressbar_bg',
        overflow: 'hidden',
        position: 'relative',

        '& div': {
          h: 4,
          background: {
            base: `linear-gradient(to right, #2DD1BD 0%, #179B87 50%, #006350 100%) left/var(--p,100%) fixed;`,
            md: `linear-gradient(to right, #2DD1BD 65%, #179B87 79.5%, #006350 94%) left/var(--p,100%) fixed;`,
            xl: `linear-gradient(to right, #2DD1BD 46%, #179B87 56%, #006350 66%) left/var(--p,100%) fixed;`,
          },
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
