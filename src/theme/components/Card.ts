import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    p: 0,
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

const lite = definePartsStyle({
  ...cardCommonStyles,

  container: {
    ...cardCommonStyles.container,
    w: 72,
    borderRadius: 'lg',
    overflow: 'hidden',
    boxShadow: 'var(--box-shadow)',
    transition: 'box-shadow .2s  ',
    cursor: 'pointer',

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

const detailed = definePartsStyle({
  ...cardCommonStyles,

  container: {
    ...cardCommonStyles.container,
    w: { base: 84, sm: 100 },
    position: 'relative',
    height: 80,
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
    alignItems: 'start',
    gap: 3,
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
    '& a': {
      height: '100%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',

      '& > p:first-of-type': {
        color: 'card.header',
        mb: 1,
        textAlign: 'start',
      },

      '& > p:nth-of-type(2)': {
        textAlign: 'start',
        fontSize: 'xl2',
        noOfLines: 2,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 'var(--chakra-line-clamp)',
      },

      '& > div:first-of-type': {
        textAlign: 'start',
        color: 'card.description',
        noOfLines: 4,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 'var(--chakra-line-clamp)',
      },

      '& > div:last-of-type': {
        mt: 'auto',
        display: 'flex',
        justifyContent: 'start',
        gap: 3.5,

        '& div': {
          textAlign: 'start',
        },

        '& > div > p:first-of-type': {
          color: 'card.footer_title',
          fontWeight: 'normal',
          fontStyle: 'normal',
          width: 'auto',
          whiteSpace: { sm: 'nowrap' },
        },

        '& div:nth-of-type(even)': {
          pl: 3.5,
          textAlign: 'start',
          borderLeft: '1px solid',
          borderColor: 'card.footer_divider',
        },
      },
    },
    '& > div:last-of-type': {
      mt: 7,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
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
    mx: 'auto',
    bgColor: 'organization.election_list_empty_bg',
    borderRadius: 'lg',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: { base: 2, md: 5 },

    '& > p:first-of-type': {
      textAlign: 'center',
      fontSize: 'xl2',
      mb: 0,
    },

    '& > a': {
      display: 'flex',
      justifyContent: 'center',
      mx: 'auto',
    },
  },
})

const variantsCards = {
  detailed,
  lite,
  'no-elections': noElections,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
