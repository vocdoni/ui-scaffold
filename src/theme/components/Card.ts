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
    padding: 0,
  },
  body: {
    padding: 0,
  },
  footer: {
    padding: 0,
  },
}

const organization = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...cardCommonStyles.header,
    overflow: 'hidden',
  },
  body: {
    ...cardCommonStyles.body,
    bgColor: 'white',
    paddingX: 3,
    py: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',
    flexDirection: 'column',
    bgColor: 'white',
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
    transition: 'background .3s ease-in-out',
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...cardCommonStyles.header,
    overflow: 'hidden',
    borderTopRadius: 10,
  },
  body: {
    ...cardCommonStyles.body,
    minH: 20,
    bgColor: 'white',
    paddingX: 3,
    pt: 3,
    pb: 1,
    fontSize: 16,
    fontWeight: 'bold',

    '& p:first-of-type': {
      textTransform: 'uppercase',
      isTruncated: true,
      fontWeight: 'normal',
      color: 'list.card.type',
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
    bgColor: 'white',
    paddingX: 3,
    pb: 2,
    fontSize: 14,

    '& div': {
      width: '100%',
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      borderLeftColor: 'lightgray',
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
      color: 'list.card.created_date',
      fontSize: 14,
      mb: 1,
    },

    '& div:first-of-type h4': {
      fontSize: 20,
      textAlign: 'start',
    },

    '& > div:nth-of-type(1) > div:first-of-type > div': {
      overflow: 'hidden',
      mb: 1,
    },

    '& > div:nth-of-type(1) > div:first-of-type > div > p': {
      color: 'gray',
    },

    '& > div:nth-of-type(2)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgColor: 'white',
      minH: 14,

      '& > p': {
        color: 'list.card.process_canceled',
      },

      '& div': {
        width: '100%',
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: 'lightgray',
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
      '& div p:nth-of-type(even)': {
        paddingLeft: 1,
      },
    },
  },
})

const aside = definePartsStyle({
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
    borderColor: 'aside.card',
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
      borderColor: 'aside.card',

      '& svg': {
        color: 'aside.card',
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
        color: 'aside.card',
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
    borderRadius: 25,
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
    backgroundColor: 'white',
    borderRadius: 2.5,
  },
})

const variantsCards = {
  organization,
  'process-img': processImg,
  'process-description': processDescription,
  aside,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
