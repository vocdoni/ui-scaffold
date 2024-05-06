import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    '&': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      mt: '20px',
    },
    '& > div:nth-of-type(1)': {
      '& > p': {
        display: 'none',
      },
    },
    '& > div:nth-of-type(2)': {
      boxShadow: '1px 1px 5px 5px gray',
      bgColor: 'white',
      p: 5,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexWrap: 'wrap',
      '& p:nth-of-type(1)': {
        width: { base: '70%', lg2: '120px' },
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
        bgColor: 'results.progressbar_bg',
        overflow: 'hidden',
        position: 'relative',

        '& div': {
          h: 4,
          background: {
            base: `linear-gradient(to right, #d9e5ff 30%, #0053FF 80%, #0053FF 100%) left/var(--p,100%) fixed;`,
            md: `linear-gradient(to right, #d9e5ff 65%, #0053FF 85%, #0053FF 94%) left/var(--p,100%) fixed;`,
            lg2: `linear-gradient(to right, #d9e5ff 45%, #0053FF 60%, #0053FF 94%) left/var(--p,100%) fixed;`,
            xl: `linear-gradient(to right, #d9e5ff 50%, #0053FF 60%, #0053FF 66%) left/var(--p,100%) fixed;`,
          },
        },
      },

      '& > div:nth-of-type(2) > div:last-of-type': {
        mb: 0,
      },
    },
  },

  secret: {
    px: 8,
    py: 8,
    my: 4,
    color: 'process.results.alert_color',
    bgColor: 'process.results.alert_bg',
    whiteSpace: 'wrap',
    maxW: '900px',
    mx: 'auto',
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
    mt: '20px',
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
