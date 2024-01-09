import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const process = defineStyle({
  w: 'full',
  color: { base: 'process.vote_button.mobile_color', md: 'process.vote_button.desktop_color' },
  borderRadius: 'full',
  fontSize: { base: 'sm', xl2: 'md' },
  bgColor: { base: 'process.vote_button.mobile_bg', md: 'process.vote_button.desktop_bg' },
})

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    borderRadius: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    bgColor: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.100`,

    color: colorScheme !== 'gray' ? 'white' : 'black',

    _hover: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.200`,
    },

    _active: {
      bgColor: colorScheme !== 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`,
    },
  }
})

const secondary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    borderRadius: 'full',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    bgColor: 'gray.100',
    color: colorScheme !== 'gray' ? `${colorScheme}.500` : `${colorScheme}.300`,

    _hover: {
      bgColor: 'gray.200',
      color: colorScheme !== 'gray' ? `${colorScheme}.600` : `${colorScheme}.300`,
    },

    _active: {
      bgColor: 'gray.300',
      color: colorScheme !== 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`,
    },
  }
})
const dropdown = defineStyle({
  borderRadius: 'full',
  bgColor: 'transparent',
  boxShadow: 'var(--box-shadow-btn)',

  _hover: {
    bgColor: 'gray.100',
  },

  _active: {
    bgColor: 'gray.200',
    boxShadow: 'none',
  },
})
const addressDropdown = defineStyle((props) => {
  return {
    minW: 40,
    bgColor: 'gray.100',

    _hover: {
      bgColor: 'gray.200',
    },

    _active: {
      bgColor: 'gray.300',
    },
  }
})
const transparent = defineStyle((props) => {
  return {
    bgColor: 'transparent',

    _hover: {
      bgColor: 'transparent',
    },
    _active: {
      bgColor: 'transparent',
    },

    _disabled: {},
  }
})

const icon = defineStyle((props) => {
  const { colorScheme } = props

  return {
    color: `${colorScheme}.600`,
    bgColor: 'transparent',

    _hover: {
      bgColor: `${colorScheme}.500`,
      color: 'white',
    },
    _active: {
      bgColor: `${colorScheme}.700`,
      color: 'white',
    },

    _disabled: {},
  }
})

const closeForm = defineStyle({
  bgColor: 'white',
  fontWeight: 'normal',
  bgImage: '/assets/close-icon.svg',
  bgRepeat: 'no-repeat',
  bgSize: '10px',
  bgPosition: '15px 52%',
  pl: '30px',
})

const goBack = defineStyle({
  fontWeight: 'normal',
  bgImage: '/assets/goback-icon.svg',
  bgRepeat: 'no-repeat',
  bgSize: '5px',
  bgPosition: '20px 50%',
  pl: '30px',
  bgColor: 'gray.100',

  _hover: {
    bgColor: 'gray.200',
  },

  _active: {
    bgColor: 'gray.300',
  },

  '& span': {
    color: 'organization.go_back_btn',
    overflow: 'hidden',
    fontSize: 'sm',
    isTruncated: true,
    maxW: '200px',
  },
})

export const Button = defineStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
    variant: 'primary',
  },
  variants: {
    'address-dropdown': addressDropdown,
    'close-form': closeForm,
    dropdown,
    'go-back': goBack,
    icon,
    process,
    primary,
    secondary,
    transparent,
  },
})
