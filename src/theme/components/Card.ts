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

      '& div:first-of-type': {
        display: 'flex',
        gap: 2,
        mb: 3,
      },
      '& > div:nth-of-type(2)': {
        '& > p:first-of-type': {
          textAlign: 'start',
          color: 'organization.card.description',
          noOfLines: 4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 'var(--chakra-line-clamp)',
        },
        '& > p:not(:first-of-type)': {
          display: 'none',
        },
      },
      '& > p:nth-of-type(2)': {
        border: '1px solid red',
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
        py: 2.5,
        px: 2,
        textAlign: 'center',
        minW: '50%',
        bgColor: 'organization.card.footer_bg',

        '& p': {
          whiteSpace: 'nowrap',
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
  },

  body: {
    display: 'flex',
    flexDirection: { base: 'column', lg: 'row' },
    gap: { base: 5, lg: 0 },

    '& > div': {
      flex: '1 1 50%',
      px: 10,
    },
    '& > div:first-of-type': {
      display: 'flex',
      justifyContent: { base: 'center', lg: 'end' },
      alignItems: 'center',
    },
    '& > div:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: { base: 'center', lg: 'start' },
      gap: 5,

      '& > p:first-of-type': {
        fontSize: 'xl2',
        fontWeight: 'bold',
      },
    },
  },
})

const variantsCards = {
  detailed,
  'no-elections': noElections,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
