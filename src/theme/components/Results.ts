import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    p: 4,
    width: { base: 'full', xl: '80%' },
    m: 0,
    mx: 'auto',

    '& > div:nth-of-type(1)': {
      '& > p': {
        fontSize: 'xl2',
        mb: 5,
        lineHeight: 1.3,
        textAlign: 'start',
      },
    },
    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexDirection: { base: 'column', md: 'row' },
      alignItems: { base: 'center', md: 'start' },
      gap: 3,
      mb: 5,

      '& p:nth-of-type(1)': {
        maxW: '100%',
        flexBasis: '33%',
        flexGrow: 1,
        color: 'process.results.description',
      },
      '& p:nth-of-type(2)': {
        mx: 4,
      },
      '& div': {
        w: 'full',
        flexBasis: '33%',
        flexGrow: 0,
        flexShrink: 0,
        h: 6,
        borderRadius: 'md',
        bgColor: 'results.progressbar_bg',
        overflow: 'hidden',
        position: 'relative',

        '& div': {
          h: 6,
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
    px: 8,
    py: 8,
    my: 4,
    color: 'process.results.alert_color',
    bgColor: 'process.results.alert_bg',
    borderRadius: 'lg',
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
    gap: 10,
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
