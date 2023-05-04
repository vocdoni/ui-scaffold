import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    padding: 0,
    cursor: 'pointer',
  },
  header: {
    padding: 0,
    bgColor: 'card.bg',
  },
  body: {
    padding: 0,
    bgColor: 'card.bg',
  },
  footer: {
    padding: 0,
    bgColor: 'card.bg',
  },
}

const lite = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    width: 72,
    overflow: 'hidden',
    borderRadius: 10,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: 4,
    p: 4,
    fontWeight: 'bold',

    '& > div:first-of-type': {
      h: 12,
    },

    '& > div:first-of-type p:first-of-type': {
      fontSize: 'xs',
      lineHeight: 1,
      fontWeight: 400,
      textTransform: 'uppercase',
      color: 'card.top_header',
      isTruncated: true,
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
      gap: 3.5,
      padding: 0,

      '& div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 1,
        padding: 0,

        '& p:nth-of-type(odd)': {
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'sm',
          lineHeight: '100%',
          color: 'card.footer_title',
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
    w: { base: 84, sm: 100 },
  },
  header: {
    ...cardCommonStyles.header,
    alignSelf: 'start',
    pl: 6,

    '& span': {
      borderRadius: '4px 4px 0px 0px',
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },

  body: {
    ...cardCommonStyles.body,
    position: 'relative',
    p: 4,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,

    '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',

      '& > p:first-of-type': {
        fontSize: 'md',
        lineHeight: 5,
        color: 'card.top_header',
      },

      '& > h4': {
        mb: 2.5,
        textAlign: 'start',
        fontWeight: 700,
        fontSize: '3xl',
      },

      '& > div:first-of-type p': {
        overflow: 'hidden',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 'md',
        lineHeight: 5,
        textAlign: 'start',
        color: 'card.description',
      },
    },
    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      gap: '14px',
      padding: '0px',

      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 3.5,
        padding: 0,

        '& p:nth-of-type(odd)': {
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '100%',
          color: 'card.footer_title',
        },
        '& p:nth-of-type(even)': {
          fontWeight: '600',
          fontSize: 'sm',
          lineHeight: 4,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3.5,
    width: '94%',
    h: 12,
    p: 1,
    mx: 'auto',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'card.detailed.footer',
    borderRadius: '0px 0px 8px 8px',

    '& button': {
      border: '1px solid ',
      borderRadius: '50%',
    },

    '& button:disabled': {
      color: 'card.detailed.btn_disabled',
    },
  },
})

const variantsCards = {
  lite,
  detailed,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
