import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    width: '100%',
    padding: 0,
    borderRadius: '10px',

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
    maxW: '275px',
    transition: 'background .3s ease-in-out',
    borderBottom: '10px',
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...cardCommonStyles.header,
    width: '50%',
    overflow: 'hidden',
    borderTopRadius: '10px',
  },
  body: {
    ...cardCommonStyles.body,
    bgColor: 'white',
    px: '12px',
    py: '6px',
    fontSize: '.9em',
    fontWeight: 'bold',
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',
    flexDirection: 'column',
    bgColor: 'white',
    px: '12px',
    pb: '6px',
    fontSize: '.8em',

    '& p:first-of-type': {
      width: 'min-content',
      bgGradient: 'linear(to-r, #9526FC, #2ED3BF)',
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
    maxW: '275px',
    transition: 'background .3s ease-in-out',
    borderBottom: '10px',
    overflow: 'hidden',
    bgColor: 'transparent',
  },
  header: {
    ...cardCommonStyles.header,
    overflow: 'hidden',
    borderTopRadius: '10px',
  },
  body: {
    ...cardCommonStyles.body,
    bgColor: 'white',
    px: '12px',
    py: '10px',
    fontSize: '.9em',
    fontWeight: 'bold',
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',
    justifyContent: 'center',
    bgColor: 'white',
    px: '12px',
    pb: '6px',
    fontSize: '.8em',

    '& div': {
      width: '100%',
      borderLeft: '1px solid lightgray',
      pl: '12px',
    },

    '& div:first-of-type': {
      borderLeft: 'none',
      pl: '0px',
    },

    '& div p:nth-of-type(odd)': {
      width: 'min-content',
      bgGradient: 'linear(to-r, #9526FC, #2ED3BF)',
      bgClip: 'text',
    },
    '& div p:nth-of-type(even)': {
      fontWeight: 'bold',
    },
  },
})
const process = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    border: '1px solid lightgray',
    maxW: '500px',
    display: 'flex',
    direction: 'column',
    px: '25px',
    py: '20px',
    transition: 'background .3s ease-in-out',
    _hover: {
      transition: 'background .3s ease-in-out',
      backgroundColor: 'gray.100',
    },

    '& hr': {
      height: '.2px',
      mt: '20px',
      mb: '15px',
    },
  },
  header: {
    ...cardCommonStyles.header,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '5px',
    overflow: 'hidden',
    marginBottom: '15px',

    '& h4': {
      fontSize: '1.4em',
      textAlign: 'start',
      margin: 0,
    },
    '& span': {
      flexShrink: 0,
    },
  },
  body: {
    ...cardCommonStyles.body,
    color: 'gray',
    overflow: 'hidden',
    noOfLines: 3,

    '& p': {
      marginBottom: 0,
    },
  },
  footer: {
    ...cardCommonStyles.footer,
    display: 'flex',

    '& div': {
      flex: '1 1 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '& div:nth-of-type(1)': {
      borderRight: '1px solid rgb(203, 213, 224)',
    },
  },
})

const vote = definePartsStyle({
  container: {
    ...cardCommonStyles.container,
    direction: 'column',
    width: 'auto',
    maxWidth: '320px',
    gap: '20px',
    borderRadius: 'lg',
    padding: '20px',
    position: 'sticky',
    top: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'branding.purple',

    zIndex: 10,

    '& hr': {
      height: '.2px',
      m: 0,
    },
  },
  header: {
    ...cardCommonStyles.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',

    '& div:nth-of-type(1)': {
      bg: 'branding.lightpurple1',
      width: '50px',
      height: '50px',
      border: '.1px solid',
      borderColor: 'branding.purple',

      '& svg': {
        color: 'branding.purple',
        boxSize: '30px',
      },
    },

    '& div': {
      'p:nth-of-type(1)': {
        fontSize: '1.2em',
        fontWeight: 'bold',
      },

      span: {
        color: 'branding.purple',
      },
    },
  },
  body: {
    ...cardCommonStyles.body,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '20px',

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
    px: '25px',
    py: '20px',
    borderRadius: 'lg',
  },
  header: {
    ...cardCommonStyles.header,
  },
  body: {
    ...cardCommonStyles.body,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
})

const variantsCards = {
  organization,
  processImg,
  process,
  vote,
  results,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
