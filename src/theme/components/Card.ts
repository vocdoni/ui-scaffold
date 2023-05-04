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

const processDescription = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    display: 'flex',
    flexDirection: 'column',
    maxW: 124,
  },
  header: {
    ...cardCommonStyles.header,
    alignSelf: 'end',

    '& span': {
      borderBottomRadius: 'none',
    },
  },

  body: {
    ...cardCommonStyles.body,
    boxShadow: '1px 1px 10px 2px lightgray',
    borderLeftRadius: 10,
    borderBottomRightRadius: 10,
    py: 5,
    paddingX: 7,

    '& div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',
    },

    '& div:first-of-type > div': {
      height: 14,
    },
    '& > div:first-of-type > p:first-of-type': {
      color: 'card.variant.process_description',
      fontSize: 14,
      mb: 1,
    },

    '& div:first-of-type h4': {
      fontSize: 20,
      textAlign: 'start',
      color: 'card.title',
    },

    '& > div:nth-of-type(1) > div:first-of-type > div': {
      overflow: 'hidden',
      mb: 1,
    },

    '& > div:nth-of-type(1) > div:first-of-type > div > p': {
      color: 'card.description',
    },

    '& > div:nth-of-type(2)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgColor: 'white',
      minH: 14,

      '& > p': {
        color: 'card.process_canceled',
      },

      '& div': {
        width: '100%',
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: 'card.footer_divider',
        pl: 12,
      },

      '& div:first-of-type': {
        borderLeft: 'none',
        pl: 0,
      },
      '& div p': {
        whiteSpace: 'nowrap',
      },
      '& div p:nth-of-type(odd)': {
        width: 'min-content',
        bgGradient: 'var(--vcd-gradient-brand)',
        bgClip: 'text',
      },
    },
  },
})

const processInfo = definePartsStyle({
  container: {
    ...cardCommonStyles.container,
    direction: 'column',
    width: 'auto',
    maxWidth: 88,
    gap: 11,
    borderRadius: 10,
    padding: 5,
    position: 'sticky',
    top: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'card.variant.process_info',
    cursor: 'normal',
    zIndex: 10,

    '& hr': {
      height: 1,
      m: 0,
    },
  },
  header: {
    ...cardCommonStyles.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2.5,

    '& div:nth-of-type(1)': {
      width: 12,
      height: 12,

      borderWidth: 1,
      sorderStyle: 'solid',
      borderColor: 'card.variant.process_info',

      '& svg': {
        color: 'card.variant.process_info',
        boxSize: 8,
      },
    },

    '& div': {
      'p:nth-of-type(1)': {
        fontSize: 20,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      },

      span: {
        color: 'cards.variants.process_info',
      },
    },
  },
  body: {
    ...cardCommonStyles.body,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 5,

    '& btn': {
      alignSelf: 'center',
    },

    '& div:last-child': {
      display: 'flex',
      flexDirection: 'column',

      '& button': {
        textAlign: 'center',
      },
    },
  },
})

const results = definePartsStyle({
  container: {
    ...cardCommonStyles.container,
    paddingX: 6,
    py: 5,
  },
  header: {
    ...cardCommonStyles.header,
    fontSize: 20,
  },
  body: {
    ...cardCommonStyles.body,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
})

const variantsCards = {
  lite,
  'process-description': processDescription,
  'process-info': processInfo,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
