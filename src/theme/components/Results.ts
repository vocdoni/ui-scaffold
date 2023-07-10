import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    background: 'process.results.bg',
    p: 4,
    borderRadius: 'md',
    width: 'full',
    m: 0,
    mx: 'auto',

    '& > div:nth-of-type(2) > div': {
      display: 'flex',
      flexDirection: { base: 'column', md: 'row' },
      alignItems: 'center',
      gap: 3,
      mb: 5,

      '& p:nth-of-type(1)': {
        maxW: '100%',
        flexBasis: '33%',
        flexGrow: 1,
        color: 'process.results.description',
      },
      '& div': {
        w: 'full',
        flexBasis: '33%',
        flexGrow: 0,
        flexShrink: 0,
        h: 4,
        borderRadius: 'md',
        bgColor: 'progress_bar.bg',
        overflow: 'hidden',
        position: 'relative',

        '& div': {
          h: 4,
          background: {
            base: `linear-gradient(-45deg,
              rgba(255, 255, 255, 0.15) 25%,transparent 25%, 
              transparent 50%, rgba(255, 255, 255, 0.15) 50%, 
              rgba(255, 255, 255, 0.15) 75%,transparent 75%) 
            left/30px 30px repeat-x,
            linear-gradient(to right, red 0%, yellow 50%, green 100%) left/var(--p,100%) fixed,
            lightgray;`,

            md: `linear-gradient(-45deg,
              rgba(255, 255, 255, 0.15) 25%,transparent 25%, 
              transparent 50%, rgba(255, 255, 255, 0.15) 50%, 
              rgba(255, 255, 255, 0.15) 75%,transparent 75%) 
            left/30px 30px repeat-x,
            linear-gradient(to right, red 65%, yellow 79.5%, green 94%) left/var(--p,100%) fixed,
            lightgray;`,

            xl: `linear-gradient(-45deg,
              rgba(255, 255, 255, 0.15) 25%,transparent 25%, 
              transparent 50%, rgba(255, 255, 255, 0.15) 50%, 
              rgba(255, 255, 255, 0.15) 75%,transparent 75%) 
            left/30px 30px repeat-x,
            linear-gradient(to right, red 46%, yellow 56%, green 66%) left/var(--p,100%) fixed,
            lightgray;`,
          },

          boxShadow: 'inset 0px -2px 5px rgba(0, 0, 0, 0.5)',
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
