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

const organization = definePartsStyle({
  container: {
    ...cardCommonStyles.container,
    overflow: 'hidden',
  },
  header: {
    ...cardCommonStyles.header,
  },
  body: {
    ...cardCommonStyles.body,
    paddingX: 3,
    py: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'card.title',
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',
    flexDirection: 'column',
    paddingX: 3,
    pb: 1,
    fontSize: 14,

    '& p:first-of-type': {
      width: 'min-content',
      bgGradient: 'var(--vcd-gradient-brand)',
      bgClip: 'text',
      fontWeight: 'normal',
    },

    '& p': {
      fontWeight: 'bold',
    },
  },
})

const processImg = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    overflow: 'hidden',
  },
  header: {
    ...cardCommonStyles.header,
  },
  body: {
    ...cardCommonStyles.body,
    minH: 20,
    paddingX: 3,
    pt: 3,
    pb: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'card.title',

    '& p:first-of-type': {
      textTransform: 'uppercase',
      isTruncated: true,
      fontWeight: 'normal',
      color: 'card.variant.process_image',
      pb: 1,
    },
    '& p:nth-of-type(2)': {
      lineHeight: 1.3,
    },
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',
    justifyContent: 'center',
    paddingX: 3,
    pb: 2,
    fontSize: 14,

    '& div': {
      width: '100%',
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      borderLeftColor: 'card.footer_divider',
      pl: 2,
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
    '& div p:nth-of-type(even)': {
      fontWeight: 'bold',
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
  organization,
  'process-img': processImg,
  'process-description': processDescription,
  'process-info': processInfo,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
