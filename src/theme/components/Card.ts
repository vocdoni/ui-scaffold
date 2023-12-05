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
    p: 0,
  },
}

const detailed = definePartsStyle({
  ...cardCommonStyles,

  container: {
    ...cardCommonStyles.container,
    w: { base: 84, sm: 96 },
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--box-shadow)',
    transition: 'box-shadow .2s',
    borderRadius: 'lg',

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
      transition: 'box-shadow .2s  ',
    },
  },

  body: {
    ...cardCommonStyles.body,

    height: '100%',
    display: 'flex',
    gap: 3,
    p: 4,
    pb: 0,
    justifyContent: 'space-between',

    '& a': {
      w: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& > p:first-of-type': {
        textAlign: 'start',
        fontSize: 'xl2',
        noOfLines: 2,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 'var(--chakra-line-clamp)',
        mb: 3,
      },

      '& > div:first-of-type': {
        display: 'flex',
        gap: 2,
        mb: 3,
      },

      '& > div:nth-of-type(2)': {
        flexGrow: 1,
      },
    },
  },
  footer: {
    ...cardCommonStyles.footer,
    mt: 'auto',
    fontSize: 'sm',

    '& > div:first-of-type': {
      display: 'flex',
      justifyContent: 'space-between',
      w: 'full',

      '& > div': {
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        py: 3.5,
        px: 3,
        textAlign: 'center',
        minW: '50%',
        bgColor: 'organization.card.footer_bg',

        '& p': {
          color: 'black',
          fontWeight: 'normal',
        },
        '& p:nth-of-type(2)': {
          isTruncated: true,
          whiteSpace: 'nowrap',
        },
      },
      '& > div:nth-of-type(1) ': {
        borderBottomLeftRadius: 'md',
      },
      '& > div:nth-of-type(2) ': {
        display: 'flex',
        borderBottomRightRadius: 'md',
        alignItems: 'center',
        '& p:nth-of-type(1)': {
          order: 2,
        },
        '& p:nth-of-type(2)': {
          fontWeight: 'bold',
        },
      },
    },
  },
})

const noElections = definePartsStyle({
  container: {
    p: 5,
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'lg',
    minW: 'full',
    minH: 52,
  },

  body: {
    display: 'flex',
    flexDirection: { base: 'column', lg: 'row' },
    gap: { base: 5, lg: 0 },

    '& > div': {
      flex: '1 1 50%',
      px: 10,

      '&:first-of-type': {
        display: 'flex',
        justifyContent: { base: 'center', lg: 'end' },
        alignItems: 'center',
        px: 36,

        '& img': {
          width: 52,
        },
      },

      '&:nth-of-type(2)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { base: 'center', lg: 'start' },
        gap: 5,

        '& > p:first-of-type': {
          fontWeight: 'bold',
          fontSize: 'md',
        },

        '& > p': {
          textAlign: { base: 'center', lg: 'start' },
          fontSize: 'sm',
        },
      },
    },
  },
})

const typesVoting = definePartsStyle({
  container: {
    border: '1px solid lightgray',
    bgColor: 'transparent',
    py: 3,
    px: 5,
    borderRadius: '3xl',
    opacity: '0.8',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: { base: 'lg', xl: 'xl' },
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 0,
    py: 4,

    '& svg': {
      boxSize: { base: 7, xl: 9 },
    },
  },
  body: {
    p: 0,
    pb: 3,
  },
})

const variantsCards = {
  detailed,
  'no-elections': noElections,
  'types-voting': typesVoting,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
