import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const card_common_styles = {
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
  ...card_common_styles,
  container: {
    ...card_common_styles.container,
    maxW: 72,
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...card_common_styles.header,
    overflow: 'hidden',
  },
  body: {
    ...card_common_styles.body,
    bgColor: 'white',
    px: 3,
    py: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    ...card_common_styles.footer,
    display: 'flex',
    flexDirection: 'column',
    bgColor: 'white',
    px: 3,
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

const process_img = definePartsStyle({
  ...card_common_styles,
  container: {
    ...card_common_styles.container,
    maxW: 72,
    transition: 'background .3s ease-in-out',
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...card_common_styles.header,
    overflow: 'hidden',
    borderTopRadius: 10,
  },
  body: {
    ...card_common_styles.body,
    minH: 20,
    bgColor: 'white',
    px: 3,
    pt: 3,
    pb: 1,
    fontSize: 16,
    fontWeight: 'bold',

    '& p:first-of-type': {
      textTransform: 'uppercase',
      isTruncated: true,
      fontWeight: 'normal',
      color: 'branding.blue',
      pb: 1,
    },
    '& p:nth-of-type(2)': {
      lineHeight: 1.3,
    },
  },
  footer: {
    ...card_common_styles.footer,
    display: 'flex',
    justifyContent: 'center',
    bgColor: 'white',
    px: 3,
    pb: 2,
    fontSize: 14,

    '& div': {
      width: '100%',
      borderLeft: '1px solid lightgray',
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

const process_description = definePartsStyle({
  ...card_common_styles,
  container: {
    ...card_common_styles.container,
    display: 'flex',
    flexDirection: 'column',
    maxW: 124,
  },
  header: {
    ...card_common_styles.header,
    alignSelf: 'end',
  },

  body: {
    ...card_common_styles.body,
    boxShadow: '1px 1px 10px 2px lightgray',
    borderLeftRadius: 10,
    borderBottomRightRadius: 10,
    py: 5,
    px: 7,

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
      color: 'branding.turquoise',
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
      bgColor: 'white',

      '& div': {
        width: '100%',
        borderLeft: '1px solid lightgray',
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
        fontWeight: 'bold',
      },
    },
  },
})

const vote = definePartsStyle({
  container: {
    ...card_common_styles.container,
    direction: 'column',
    width: 'auto',
    maxWidth: 80,
    gap: 11,
    borderRadius: 10,
    padding: 5,
    position: 'sticky',
    top: 2,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'branding.purple',
    cursor: 'normal',
    zIndex: 10,

    '& hr': {
      height: 'px',
      m: 0,
    },
  },
  header: {
    ...card_common_styles.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2.5,

    '& div:nth-of-type(1)': {
      bg: 'branding.lightpurple',
      width: 12,
      height: 12,
      border: '.1px solid',
      borderColor: 'branding.purple',

      '& svg': {
        color: 'branding.purple',
        boxSize: 8,
      },
    },

    '& div': {
      'p:nth-of-type(1)': {
        fontSize: 20,
        fontWeight: 'bold',
      },

      span: {
        color: 'branding.purple',
      },
    },
  },
  body: {
    ...card_common_styles.body,
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
    ...card_common_styles.container,
    px: 6,
    py: 5,
    borderRadius: 25,
  },
  header: {
    ...card_common_styles.header,
    fontSize: 20,
  },
  body: {
    ...card_common_styles.body,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    backgroundColor: 'white',
    borderRadius: 2.5,
  },
})

const variantsCards = {
  organization,
  'process-img': process_img,
  'process-description': process_description,
  vote,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
