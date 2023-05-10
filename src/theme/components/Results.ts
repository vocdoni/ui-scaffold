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
    py: { lg: 5 },
  },
  cardHeader: {},
  title: {},
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,

    '& > div': {
      display: 'grid',
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(2, 1fr)',
      overflow: 'hidden',

      '& p:first-of-type': {
        gridColumn: { base: '1/3', sm: '1/2' },
        gridRow: { base: '1/2', sm: '1/3' },
        display: 'flex',
        justifyContent: { base: 'center', sm: 'start' },
        alignItems: 'center',
        isTruncated: true,
      },

      '& p:nth-of-type(2)': {
        gridColumn: '2/3',
        gridRow: { base: '2/3', sm: '1/2' },
        textAlign: 'center',
      },

      '& > div': {
        gridColumn: { base: '1/2', sm: '2/3' },
        gridRow: '2/3',
        h: '100%',
      },
    },
  },

  progress: {
    label: {},
    track: {
      display: 'flex',
      alignItems: 'center',
      minH: '200px',
      border: '5px solid red',
    },
    filledTrack: {
      bg: 'orange',
      h: '50%',
    },
  },
})

export const ElectionResults = defineMultiStyleConfig({
  baseStyle,
})
