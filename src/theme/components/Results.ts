import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    maxW: { base: '100%', md: '76%', lg: '100%', xl: '76%' },
    mt: 6,
    mx: 'auto',
    padding: 5,
    paddingBottom: 7,
    background: 'process.results.bg',
    borderRadius: '8px',
  },

  question: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minW: '100%',
  },

  header: {
    textAlign: 'start',
  },

  title: {
    fontWeight: 700,
    fontSize: 'xl',
    lineHeight: 7,
    color: 'process.results.title',
    textAlign: { base: 'center', md: 'start' },
  },

  body: {
    display: 'flex',
    flexDirection: 'column',

    gap: { base: 7, md: 5 },

    '& > div': {
      display: 'flex',
      flexDirection: { base: 'column', md: 'row' },
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: { base: 2, md: 0 },

      '& p:first-of-type': {
        width: { base: '100%', md: '25%' },
        textAlign: { base: 'center', md: 'start' },
        isTruncated: true,
        fontWeight: 600,
      },

      '& p:nth-of-type(2)': {
        fontWeight: 600,
      },

      '& > div': {
        minW: { base: '85%', sm: '60%', md: '40%' },
        h: 6,
        borderRadius: 8,
        bgColor: 'progress_bar_bg',

        '& div': {
          background: 'var(--vcd-gradien-progress-bar)',
        },
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
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
