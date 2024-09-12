import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
  variants: {
    'pricing-card': {
      container: {
        position: 'relative',
        bgColor: 'white',
        minW: { base: '80%', sm: '280px' },
        w: { base: '80%', sm: '280px' },
      },
      header: {
        pb: 0,
        minH: '112px',
        '& > p:first-of-type': {
          pt: '5px',
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          mb: '10px',
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
          mb: '15px',
        },
        '& > p:first-of-type': {
          fontWeight: 'extrabold',
          textAlign: 'center',
          fontSize: 'xl',
          mb: '15px',
        },
        '& > div:last-of-type': {
          ml: '12px',
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
