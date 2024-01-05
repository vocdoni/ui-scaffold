import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    borderRadius: 0,
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
    w: '350px',
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--box-shadow)',
    transition: 'box-shadow .2s',
    borderRadius: 0,

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
      w: '85%',
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
    bgColor: 'organization.card.footer_bg',

    '& > div:first-of-type': {
      padding: '12px 16px',
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

        '& p': {
          whiteSpace: 'nowrap',
          color: 'organization.card.footer_color',
          fontWeight: 'normal',
        },
        '& p:nth-of-type(2)': {
          isTruncated: true,
          whiteSpace: 'nowrap',
        },
      },
      '& > div:first-of-type': {
        justifyContent: 'start',
      },

      '& > div:nth-of-type(2) ': {
        justifyContent: 'end',

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
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'none',
    maxW: '1440px',
    mx: 'auto',
    padding: '40px',
  },

  body: {
    display: 'flex',
    flexDirection: { base: 'column', lg2: 'row' },
    gap: 10,

    '& > div:first-of-type': {
      flex: '1 1 50%',

      '&:first-of-type': {
        '& img': {
          maxW: { base: '40%', lg2: '100%' },
          mx: 'auto',
        },
      },
    },
    '& > div:nth-of-type(2)': {
      flex: '1 1 50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: { base: 'start', lg2: 'start' },
      alignItems: { base: 'center', lg2: 'start' },

      '& > p:first-of-type': {
        fontWeight: 'bold',
        fontSize: { base: '30px', lg: '40px' },
        lineHeight: { base: '32px', lg: '42.5px' },
        mb: '24px',
        textAlign: { base: 'center', lg2: 'start' },
      },

      '& > p:nth-of-type(2)': {
        textAlign: { base: 'center', lg2: 'start' },
        fontSize: '18px',
        lineHeight: '19.5px',
        color: '#595959',
        mb: '24px',
      },
      '& > p:nth-of-type(3)': {
        textAlign: { base: 'center', lg2: 'start' },
        fontSize: '18px',
        lineHeight: '19.5px',
        color: '#595959',
        mb: '40px',
      },
    },
  },
})

const typesVoting = definePartsStyle({
  container: {
    bgColor: 'transparent',
    textAlign: { base: 'center', lg22: 'start' },
    w: '240px',
    minH: 'none',

    '& p:nth-of-type(2)': {
      color: 'red',
    },
  },
  body: {
    flex: '0 0 0%',
    p: 0,

    svg: {
      display: 'none',
    },
    'p:first-of-type': {
      fontSize: 22,
      mb: 2,
      fontWeight: 'bold',
      fontFamily: 'pixeloidsans',
    },
  },

  footer: {
    p: 0,
    fontSize: '18px',
    lineHeight: '24px',
  },
})
const aside = definePartsStyle({
  container: {
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: { base: 12, lg2: 12 },
    py: { base: 8, lg2: 12 },
    w: 'full',
    gap: 4,
    mt: { lg2: 7 },
    mb: { base: 7, lg2: 0 },
    color: 'process.aside.color',
    background: 'process.aside.bg',
    boxShadow: 'var(--box-shadow-banner)',
    clipPath:
      'polygon(0% 15px, 15px 15px, 15px 0%, calc(100% - 15px) 0%, calc(100% - 15px) 15px, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 15px calc(100% - 15px), 0% calc(100% - 15px))',
  },
})

const variantsCards = {
  aside,
  detailed,
  'no-elections': noElections,
  'types-voting': typesVoting,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
