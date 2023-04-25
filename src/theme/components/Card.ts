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
      fontWeight: '400',
      color: 'card.variant.image.organization',
      fontSize: '12px',
      lineHeight: '15px',
    },
    '& > div:first-of-type p:nth-of-type(2)': {
      fontSize: '18px',
      lineHeight: '22.5px',
      fontWeight: 700,
    },

    '& > div > p:nth-of-type(2)': {
      fontSize: '16px',
      lineHeight: '22.5px',
      fontWeight: '700',
    },

    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      padding: '0px',
      gap: '14px',

      '& div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '0px',
        gap: '4px',

        '& p:nth-of-type(odd)': {
          color: 'card.variant.image.footer',
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
      '& div:nth-of-type(even)': {
        pl: '14px',
        borderLeft: '1px solid gray',
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
    maxW: '416px',
    minW: '348px',
  },
  header: {
    ...cardCommonStyles.header,
    alignSelf: 'start',
    pl: '24px',

    '& span': {
      borderRadius: '4px 4px 0px 0px',
    },
  },

  body: {
    ...cardCommonStyles.body,
    position: 'relative',
    boxShadow: '1px 1px 10px 2px lightgray',
    borderRadius: '8px',
    p: '16px',

    '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',

      '& > p:first-of-type': {
        fontSize: '16px',
        color: 'card.variant.image.organization',
        lineHeight: '20px',
      },

      '& > h4': {
        textAlign: 'start',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '40px',
        mb: '10px',
      },

      '& > div:first-of-type p': {
        overflow: 'hidden',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'card.description',
      },
    },
    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      padding: '0px',
      gap: '14px',

      '& > p': {
        color: 'card.variant.image.footer',
      },

      '& div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '0px',
        gap: '4px',

        '& p:nth-of-type(odd)': {
          color: 'card.variant.image.footer',
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
      '& div:nth-of-type(even)': {
        pl: '14px',
        borderLeft: '1px solid gray',
      },
    },
  },

  footer: {
    width: '94%',
    height: '48px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    padding: '4px',
    backgroundColor: '#F5F5F5',
    mx: 'auto',
    borderRadius: '0px 0px 8px 8px',

    '& button': {
      border: '2px solid ',
      borderRadius: '50%',
    },

    '& button:disabled': {
      color: 'red',
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
  detailed,
  'process-info': processInfo,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
