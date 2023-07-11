import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    p: 0,
    cursor: 'pointer',
  },
  header: {
    p: 0,
  },
  body: {
    p: 0,
  },
  footer: {
    fontSize: 'sm',
  },
}

const detailed = definePartsStyle({
  ...cardCommonStyles,

  container: {
    ...cardCommonStyles.container,
    w: { base: 84, sm: 100 },
    position: 'relative',
    minH: 76,
  },

  header: {
    ...cardCommonStyles.header,
    textAlign: 'start',
    pl: 10,
    position: 'relative',
    zIndex: 1,

    '& span': {
      ml: 'auto',
      borderRadius: '4px 4px 0px 0px',

      px: 4,
    },
  },

  body: {
    ...cardCommonStyles.body,

    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
    p: 5,
    boxShadow: 'var(--box-shadow)',
    transition: 'box-shadow .2s',
    borderRadius: 'lg',

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
      transition: 'box-shadow .2s  ',
    },

    '& > div:first-of-type': {
      display: 'flex',
      gap: 5,
      justifyContent: 'space-between',

      '& > div:first-of-type ': {
        textAlign: 'start',

        '& > p:first-of-type': {
          color: 'card.header',
          mb: 1,
        },

        '& > p:nth-of-type(2)': {
          mb: 1.5,
          textAlign: 'start',
          fontSize: 'xl2',
          noOfLines: 2,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 'var(--chakra-line-clamp)',
        },

        '& > div': {
          color: 'card.description',
          noOfLines: 4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 'var(--chakra-line-clamp)',
        },
      },
    },

    '& > div:nth-of-type(2)': {
      mt: 'auto',
      display: 'flex',
      gap: 3.5,

      '& div': {
        textAlign: 'start',
      },

      '& > div > p:first-of-type': {
        color: 'card.footer_title',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },

      '& div:nth-of-type(even)': {
        pl: 3.5,
        textAlign: 'start',
        borderLeft: '1px solid',
        borderColor: 'card.footer_divider',
      },
    },
  },
})

const lite = definePartsStyle({
  ...cardCommonStyles,

  container: {
    ...cardCommonStyles.container,
    w: 72,
    borderRadius: 'lg',
    overflow: 'hidden',
    boxShadow: 'var(--box-shadow)',
    transition: 'box-shadow .2s  ',

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
      transition: 'box-shadow .2s  ',
    },
  },

  body: {
    minH: 24,
    p: 4,
    pb: 0,

    '& > p:first-of-type': {
      fontSize: 'sm',
      textTransform: 'uppercase',
      color: 'card.header',
      noOfLines: 1,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 'var(--chakra-line-clamp)',
    },

    '& > p:nth-of-type(2)': {
      fontWeight: 'bold',
      fontSize: 'lg',
      noOfLines: 2,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 'var(--chakra-line-clamp)',
    },
  },
  footer: {
    ...cardCommonStyles.footer,
    gap: 3.5,
    px: 4,
    pt: 0,
    pb: 2,
    fontWeight: 'bold',

    '& > div > p:first-of-type': {
      color: 'card.footer_title',
      fontWeight: 'normal',
    },

    '& div:nth-of-type(even)': {
      pl: 3.5,
      borderLeft: '1px solid',
      borderColor: 'card.footer_divider',
    },
  },
})

const noElections = definePartsStyle({
  container: {
    display: 'flex',
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    maxW: 160,
    px: { base: 2, md: 4 },
    py: { base: 4, md: 8 },
    bgColor: 'organization.election_list_empty_bg',
    borderRadius: 'lg',
  },

  body: {
    '& > p:first-of-type': {
      textAlign: 'center',
      fontSize: 'xl2',
      mb: { base: 2, md: 5 },
    },
  },
})

const variantsCards = {
  detailed,
  lite,
  'no-elections': noElections,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
