import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const address = definePartsStyle({
  button: {
    mb: 2,
    py: 2,
    px: 2.5,
    w: 30,
    h: 8,
    fontSize: 'sm',
    borderRadius: 18,
    cursor: 'pointer',
    bgColor: 'organization.button_address.bg',
    color: 'organization.button_address.color',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    _hover: {
      bgColor: 'organization.button_address.bg_hover',
    },

    _active: {
      bgColor: 'organization.button_address.bg_active',
    },
  },

  list: {
    p: 0,
    position: 'absolute',
    top: '-28',
    zIndex: 30,

    '& button': {
      justifyContent: 'start',
    },
  },
})
const variants = {
  address,
}

export const Menu = defineMultiStyleConfig({ variants })
