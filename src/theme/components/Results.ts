import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  card: {
    w: { base: 'full', lg: '80%' },
    px: { lg: 10 },
    py: { lg: 3 },
  },
  cardHeader: {},
  title: {
    textAlign: 'center',
    fontSize: 'xl',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,

    '& > div': {
      display: 'grid',
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(2, 1fr)',
      rowGap: { base: 2, md: 0 },
      overflow: 'hidden',

      '& p:first-of-type': {
        gridColumn: { base: '1/3', md: '1/2' },
        gridRow: { base: '1/2', md: '1/3' },
        display: 'flex',
        justifyContent: { base: 'center', md: 'start' },
        alignItems: 'center',
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
        h: '100%',
      },
    },
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
