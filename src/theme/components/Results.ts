import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: 6,
    gap: 20,
  },

  question: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
    maxW: 160,
  },

  header: {
    textAlign: 'center',
  },

  title: {
    fontWeight: 700,
    fontSize: 'xl',
    lineHeight: 7,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,

    '& > div': {
      display: 'grid',
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(2, 1fr)',
      rowGap: 2,
      overflow: 'hidden',

      '& p:first-of-type': {
        gridColumn: { base: '1/3', md: '1/2' },
        gridRow: { base: '1/2', md: '1/3' },
        display: 'flex',
        justifyContent: { base: 'center', md: 'start' },
        alignItems: 'center',
        fontWeight: 'bold',
        isTruncated: true,
      },

      '& p:nth-of-type(2)': {
        gridColumn: { base: '1/2', md: '2/3' },
        gridRow: { base: '2/3', md: '1/2' },
        textAlign: 'center',
      },

      '& > div': {
        gridColumn: '2/3',
        gridRow: '2/3',
        mt: { base: 1, md: 0 },
        '& div': {
          bgColor: 'progress_bar',
        },
      },
    },
  },
  secret: {
    mt: 4,
    px: 2,
    py: 3,
    color: 'results.color',
    bgColor: 'results.bg',
    borderRadius: 'md',
    whiteSpace: 'wrap',
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
