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
    border: '0px solid lightgray',
    bgColor: 'transparent',
    py: 5,
    px: 8,
    borderRadius: '3xl',
    opacity: '0.8',
    flex: { base: '0 0 100%', md2: '0 0 33%', xl: '0 0 33%' },
  },
  body: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: { base: 'lg', xl: 'xl' },
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 0,
    mb: 4,

    '& svg': {
      boxSize: { base: 7, xl: 9 },
    },
  },
  footer: {
    p: 0,
    pb: 3,
  },
})

const aside = definePartsStyle({
  container: {
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: { base: 12, md: 12 },
    py: { base: 8, md: 12 },
    w: 'full',
    gap: 4,
    mt: { md: 7 },
    mb: { base: 7, md: 0 },
    color: 'process.aside.color',
    background: 'process.aside.bg',
    boxShadow: 'var(--box-shadow-banner)',
    borderRadius: 'lg',
  },
})
const benefits = definePartsStyle({
  container: {
    w: '350px',
    borderRadius: 'xl',
  },
  header: {
    p: '30px',
    pb: '20px',
    fontSize: { base: '34.5px', sm: '38px' },
    lineHeight: { base: '42px', sm: '47px' },
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    p: '30px',
    pt: 0,
    textAlign: 'center',
  },
})

const iconCard = definePartsStyle({
  body: {
    p: 0,
    display: 'flex',
    gap: '24px',

    'div:first-of-type': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'lg',
      minW: '45px',
      h: '45px',

      svg: {
        width: '25px',
        height: '25px',
        color: 'white',
      },
    },

    'div:last-of-type': {
      'p:first-of-type': {
        fontWeight: 'bold',
        mb: '6px',
        fontSize: '20px',
        lineHeight: '24px',
      },

      'p:last-of-type': {
        color: 'gray',
      },
    },
  },
})

const step = definePartsStyle({
  body: {
    p: 0,
    display: 'flex',
    gap: '24px',

    'div:first-of-type': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'lg',
      minW: '45px',
      h: '45px',
      border: '1px solid gray',

      svg: {
        width: '25px',
        height: '25px',
        color: 'gray',
      },
    },

    'div:last-of-type': {
      'p:first-of-type': {
        fontSize: '17px',
        lineHeight: '20.4px',
        color: '#175CFF',
        fontWeight: 'bold',
        mb: '6px',
      },
      'p:nth-of-type(2)': {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 'bold',
        mb: '8px',
      },
      'p:last-of-type': {
        color: 'gray',
        fontSize: '16px',
        lineHeight: '28px',
      },
    },
  },
})
const demo = definePartsStyle({
  body: {
    w: 'full',
    maxW: '400px',
    bgColor: 'white',
    p: '15px 20px',
    borderRadius: 'lg',

    div: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgSize: 'cover',
      bgPosition: 'center',
      mb: '15px',
      borderRadius: 'lg',

      svg: {
        width: '75px',
        height: '75px',
        color: '#575757',
      },
    },
    '& p': {
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
})
const faqs = definePartsStyle({
  container: {
    borderRadius: 'none',
    borderBottom: '1px solid rgb(229, 229, 229)',
  },
  header: {
    p: 0,
    '& p': {
      fontWeight: 'bold',
      mb: '18px',
      lineHeight: '30px',
    },
  },
  body: {
    p: 0,
    mb: '17px',

    '& p': {
      fontSize: '15px',
      lineHeight: '32px',
    },
  },
})
const client = definePartsStyle({
  container: {
    border: 'none',

    _hover: {
      lg: {
        '& div:first-of-type': {
          filter: 'none',
        },
        '& span': {
          display: 'block',
        },
      },
    },
  },
  header: {
    p: 0,
    mb: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    filter: 'grayscale(100%)',
  },
  body: {
    p: 0,
    minH: '35px',
    span: {
      display: 'none',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#666',
    },
  },
})

const variantsCards = {
  aside,
  benefits,
  client,
  detailed,
  demo: demo,
  faqs,
  'icon-card': iconCard,
  'no-elections': noElections,
  step,
  'types-voting': typesVoting,
}
export const Card = defineMultiStyleConfig({ variants: variantsCards })
