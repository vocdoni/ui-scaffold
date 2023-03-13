import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const cardCommonStyles = {
  container: {
    width: '100%',
    padding: 0,
    borderRadius: '10px',
    border: '1px solid lightgray',
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
    padding: '12px',
    transition: 'background .3s ease-in-out',
    _hover: {
      transition: 'background .3s ease-in-out',
      backgroundColor: 'rgba(230, 230, 230, 0.8)',
    },
  },
  header: {
    ...cardCommonStyles.header,
    overflow: 'hidden',
    borderRadius: '10px',
  },
  body: {
    ...cardCommonStyles.body,
    px: '3px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: '8px',
    fontSize: '.9em',
    fontWeight: 'bold',
  },
  footer: {
    ...cardCommonStyles.footer,
    py: '5px',
    px: '3px',
    display: 'flex',
    justifyContent: 'end',
    fontSize: '.8em',
    '& span': {
      fontWeight: 'bold',
    },
  },
})

const process = definePartsStyle({
  ...cardCommonStyles,
  container: {
    ...cardCommonStyles.container,
    maxW: '500px',
    display: 'flex',
    direction: 'column',
    px: '25px',
    py: '20px',
  },
  header: {
    ...cardCommonStyles.header,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '7px',
  },
  body: {
    ...cardCommonStyles.body,
  },
  footer: {
    ...cardCommonStyles.footer,
  },
})

const variantsCards = {
  organization,
  process,
}

export const Card = defineMultiStyleConfig({ variants: variantsCards })
