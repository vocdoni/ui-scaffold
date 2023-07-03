import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    background: 'process.results.bg',
    p: 4,
    borderRadius: 'md',
    width: 'full',
    maxW: 160,
    m: 0,
    mx: 'auto',

    '& > div:nth-child(2) > div': {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      mb: 5,

      '& p:nth-child(1)': {
        flexBasis: '33%',
        flexGrow: 1,
        isTruncated: true,
      },
      '& div': {
        flexBasis: '33%',
        flexGrow: 0,
        flexShrink: 0,
        h: 4,
        borderRadius: 'md',
        bgColor: 'progress_bar_bg',

        '& div': {
          background: 'var(--vcd-gradien-progress-bar)',
        },
      },

      '& > div:nth-child(2) > div:last-of-type': {
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
