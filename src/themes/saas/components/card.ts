import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
  variants: {
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
