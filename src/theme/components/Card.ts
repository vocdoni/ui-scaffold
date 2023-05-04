import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    width: '100%',
    padding: 0,
    borderRadius: 10,
    cursor: 'pointer',
  },
  header: {
    bgColor: 'card.bg',
    padding: 0,
  },
  body: {
    bgColor: 'card.bg',
    padding: 0,
  },
  footer: {
    bgColor: 'card.bg',
    padding: 0,
  },
}

const lite = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    width: '306px',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px lightgray',
    backdropFilter: 'blur(10px)',
    filter: 'dropShadow(0px 4px 8px #D9D9D9)',
  },
  header: {
    ...cardCommonStyles.header,
    overflow: 'hidden',
  },
  body: {
    ...cardCommonStyles.body,
    p: '16px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '16px',
    gap: '16px',

    '& > div:first-of-type': { height: '55px' },

    '& > div:first-of-type p:first-of-type': {
      textTransform: 'uppercase',
      isTruncated: true,
      fontWeight: 400,
      color: 'card.top_header',
      fontSize: 'xs',
      lineHeight: 1,
    },
    '& > div:first-of-type p:nth-of-type(2)': {
      fontSize: 'lg',
      lineHeight: 6,
      fontWeight: 700,
    },

    '& > div > p:nth-of-type(2)': {
      fontSize: 1,
      lineHeight: 6,
      fontWeight: 700,
    },

    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      padding: 0,
      gap: 3.5,

      '& div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: 0,
        gap: 1,

        '& p:nth-of-type(odd)': {
          color: 'card.footer_title',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'sm',
          lineHeight: '100%',
        },
        '& p:nth-of-type(even)': {
          fontWeight: 600,
          fontSize: 'md',
          lineHeight: 4,
          fontStyle: 'normal',
        },
      },
      '& div:nth-of-type(even)': {
        pl: 3.5,
        borderLeft: '1px solid',
        borderColor: 'card.footer_divider',
      },
    },
  },
})

const detailed = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    display: 'flex',
    flexDirection: 'column',
    w: '416px',
  },
  header: {
    ...cardCommonStyles.header,
    alignSelf: 'start',
    pl: '24px',

    '& span': {
      borderRadius: '4px 4px 0px 0px',
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },

  body: {
    ...cardCommonStyles.body,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    p: '16px',
    position: 'relative',

    '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',

      '& > p:first-of-type': {
        fontSize: '16px',
        color: 'card.top_header',
        lineHeight: '20px',
      },

      '& > h4': {
        textAlign: 'start',
        fontWeight: 700,
        fontSize: '26px',
        mb: '10px',
      },

      '& > div:first-of-type p': {
        overflow: 'hidden',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'card.description',
        textAlign: 'start',
      },
    },
    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      padding: '0px',
      gap: '14px',

      '& > div': {
        border: '1px solid o',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '0px',
        gap: '4px',

        '& p:nth-of-type(odd)': {
          color: 'card.footer_title',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '100%',
        },
        '& p:nth-of-type(even)': {
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '16px',
          fontStyle: 'normal',
        },
      },

      '& > div:first-of-type': {
        pr: '14px',
        borderRight: '1px solid',
        borderColor: 'card.footer_divider',
      },
    },
  },

  footer: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    width: '94%',
    height: '48px',
    padding: '4px',
    backgroundColor: '#F5F5F5',
    mx: 'auto',
    borderRadius: '0px 0px 8px 8px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',

    '& button': {
      border: '1px solid ',
      borderRadius: '50%',
    },

    '& button:disabled': {
      color: 'red',
    },
  },
})

const variantsCards = {
  lite,
  detailed,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
