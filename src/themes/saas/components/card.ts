import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
  variants: {
    calendar: {
      container: {
        border: '1px solid #4E525C',
        flexDirection: 'row',
        p: 5,
        gap: 5,
        bgColor: 'transparent',
      },
      header: {
        p: 0,
      },
      body: { p: 0 },
    },
    'download-spreadsheet': (props) => ({
      container: {
        p: 6,
        maxW: 64,
        bgColor: mode('bg.secondary.light', 'bg.secondary.dark')(props),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        borderRadius: 'xl',
        mx: 'auto',
      },
      body: {
        p: 0,
        flexGrow: 0,
      },
      footer: {
        p: 0,
      },
    }),

    'pricing-card': {
      container: {
        position: 'relative',
        bgColor: 'white',
        minW: { base: '80%', sm: 72 },
        w: { base: '80%', sm: 72 },
      },
      header: {
        pb: 0,
        minH: 28,
        '& > p:first-of-type': {
          pt: 1.5,
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 2.5,
          fontSize: 'lg',
        },
        '& > p:nth-of-type(2)': {
          fontSize: 'sm',
          textAlign: 'center',
          lineHeight: 1.2,
          color: 'gray.400',
        },
      },
      body: {
        '& > button': {
          mb: 4,
        },
        '& > p:first-of-type': {
          fontWeight: 'extrabold',
          textAlign: 'center',
          fontSize: 'xl',
          mb: 4,
        },
        '& > div:last-of-type': {
          ml: 3,
          '& > ul': {
            maxW: 'fit-content',
            mx: 'auto',
            fontSize: 'sm',
          },
        },
      },
      footer: {
        display: 'flex',
        justifyContent: 'center',
        color: '#546E39',
      },
    },
  },
})
