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

    _hover: {
      boxShadow: 'gray 0px 2px 4px',
    },
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
      color: 'card.date',
      isTruncated: true,
      // noOfLines: '2 !important',
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

    w: { base: 84, sm: 100 },

    _hover: {
      '& > a > div:first-of-type > span': {
        boxShadow: 'gray 0px 2px 4px',
      },

      '& > a > div:nth-of-type(2)': {
        boxShadow: 'gray 0px 2px 4px',
      },

      '& > div': {
        postion: 'relative',
        zIndex: 10,
        boxShadow: 'gray 0px 2px 4px',
      },
    },
  },

  header: {
    ...cardCommonStyles.header,
    textAlign: 'start',
    pl: 10,
    '& span': {
      ml: 'auto',
      borderRadius: '4px 4px 0px 0px',
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
      px: 4,

      _hover: {
        boxShadow: 'gray 0px 2px 4px',
      },
    },
  },

  body: {
    ...cardCommonStyles.body,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    p: 5,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    minH: 44,
    _hover: {
      boxShadow: 'gray 0px 2px 4px',
    },

    '& > div:first-of-type': {
      overflow: 'hidden',

      '& > p:first-of-type': {
        fontSize: 'sm',
        lineHeight: 5,
        color: 'card.date',
        mb: 1,
        textAlign: 'start',
      },

      '& > h4': {
        mb: 2.5,
        textAlign: 'start',
        fontWeight: 700,
        fontSize: '2xl',
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
      gap: 3.5,
      padding: 0,
      mt: 'auto',

      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 2,
        padding: 0,

        '& p:nth-of-type(odd)': {
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'sm',
          lineHeight: '100%',
          color: 'card.footer_title',
        },
        '& p:nth-of-type(even)': {
          fontWeight: '600',
          fontSize: 'md',
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
