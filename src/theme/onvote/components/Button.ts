import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  borderRadius: 0,
})

const process = defineStyle({
  w: 'full',
  color: 'process.aside.vote_btn_color',
  borderRadius: 'full',
  fontSize: { base: 'sm', xl2: 'md' },
  bgColor: 'process.aside.vote_btn_bg',
})

const onVoteCommonStyles = {
  common: {
    maxH: '38px',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: 'pixeloidsans, monospace',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderLeft: '4px solid',
    borderRight: '4px solid',
  },

  before: {
    content: '""',
    position: 'absolute',
    top: '-4px',
    width: '100%',
    height: '4px',
    transition: 'width 0.3s ease',
  },
  after: {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    width: '100%',
    height: '4px',
    transition: 'width 0.3s ease',
  },

  hover: {
    width: 'calc(100% + 8px)',
  },

  active: {
    width: '100%',
  },
}

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...onVoteCommonStyles.common,
    bgColor: `${colorScheme}.600`,
    color: `${colorScheme}.50`,
    borderColor: `${colorScheme}.600`,

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: `${colorScheme}.600`,
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: `${colorScheme}.600`,
    },

    _hover: {
      bgColor: `${colorScheme}.700`,
      borderColor: `${colorScheme}.700`,

      _before: {
        ...onVoteCommonStyles.hover,
        bgColor: `${colorScheme}.700`,
      },

      _after: {
        ...onVoteCommonStyles.hover,
        bgColor: `${colorScheme}.700`,
      },
    },

    _active: {
      bgColor: `${colorScheme}.600`,
      borderColor: `${colorScheme}.700`,
      _before: {
        ...onVoteCommonStyles.active,
        borderColor: `${colorScheme}.700`,
      },

      _after: {
        ...onVoteCommonStyles.active,
        borderColor: `${colorScheme}.700`,
      },
    },

    _disabled: {
      bgColor: 'button_disabled.bg !important',
      color: 'button_disabled.color',
      borderColor: 'button_disabled.bg',

      _before: {
        bgColor: 'button_disabled.bg',
        transition: 'none',
      },
      _after: {
        bgColor: 'button_disabled.bg ',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        borderColor: 'button_disabled.bg',

        _before: {
          width: '100%',
          bgColor: 'button_disabled.bg',
        },
        _after: {
          width: '100%',
          bgColor: 'button_disabled.bg',
        },
      },
    },
  }
})

const secondary = defineStyle((props) => {
  const { colorScheme } = props
  return {
    ...onVoteCommonStyles.common,
    bgColor: `${colorScheme}.50`,
    color: `${colorScheme}.600`,
    borderColor: `${colorScheme}.50`,

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: `${colorScheme}.50`,
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: `${colorScheme}.50`,
    },

    _hover: {
      color: `${colorScheme}.700`,
      _before: {
        ...onVoteCommonStyles.hover,
      },

      _after: {
        ...onVoteCommonStyles.hover,
      },
    },

    _active: {
      color: `${colorScheme}.600`,
      borderColor: `${colorScheme}.500`,
      _before: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.500`,
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.500`,
      },
    },

    _disabled: {
      bgColor: 'button_disabled.disabled.bg',
      color: 'button_disabled.disabled.color',

      _before: {
        bgColor: 'button_disabled.disabled.bg',
        transition: 'none',
      },
      _after: {
        bgColor: 'button_disabled.disabled.bg',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        color: 'transparent',

        _before: {
          bgColor: 'transparent',
        },
        _after: {
          bgColor: 'transparent',
        },
      },
    },
  }
})
const dropdown = defineStyle({
  bgColor: 'transparent',

  _hover: {
    bgColor: 'transparent',
  },
  _active: {
    bgColor: 'transparent',
  },
})
const addressDropdown = defineStyle({
  ...onVoteCommonStyles.common,
  minW: 44,
  bgColor: 'black.600',
  color: 'black.50',
  borderColor: 'black.600',

  _before: {
    ...onVoteCommonStyles.before,
    bgColor: 'black.600',
  },

  _after: {
    ...onVoteCommonStyles.after,
    bgColor: 'black.600',
  },

  _hover: {
    bgColor: 'black.700',
    borderColor: 'black.700',

    _before: {
      ...onVoteCommonStyles.hover,
      bgColor: 'black.700',
    },

    _after: {
      ...onVoteCommonStyles.hover,
      bgColor: 'black.700',
    },
  },

  _active: {
    bgColor: 'black.600',
    borderColor: 'black.700',
    _before: {
      ...onVoteCommonStyles.active,
      borderColor: 'black.700',
    },

    _after: {
      ...onVoteCommonStyles.active,
      borderColor: 'black.700',
    },
  },

  _disabled: {
    bgColor: 'button_disabled.bg !important',
    color: 'button_disabled.color',
    borderColor: 'button_disabled.bg',

    _before: {
      bgColor: 'button_disabled.bg',
      transition: 'none',
    },
    _after: {
      bgColor: 'button_disabled.bg ',
      transition: 'none',
    },

    _hover: {
      transition: 'none',
      borderColor: 'button_disabled.bg',

      _before: {
        width: '100%',
        bgColor: 'button_disabled.bg',
      },
      _after: {
        width: '100%',
        bgColor: 'button_disabled.bg',
      },
    },
  },
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
      bgColor: `${colorScheme}.600`,
      color: 'white',
    },
    _active: {
      bgColor: `${colorScheme}.700`,
      color: 'white',
    },

    _disabled: {},
  }
})

const icon2 = defineStyle((props) => {
  const { colorScheme } = props

  return {
    bgColor: 'black',
    color: 'white',
    width: '50px',
    height: '50px',
    borderRadius: 'full',

    _hover: {
      bgColor: `${colorScheme}.600`,
    },

    _active: {
      bgColor: `${colorScheme}.700 `,
    },

    _selected: {
      bgColor: `${colorScheme}.700 `,
    },
    _activeLink: {
      bgColor: `${colorScheme}.700 `,
    },

    _disabled: {
      bgColor: 'button_disabled.disabled.bg',
      color: 'button_disabled.disabled.color',
      border: 'none',

      _before: {
        bgColor: 'button_disabled.disabled.bg',
        transition: 'none',
        borderColor: 'button_disabled.disabled.bg',
      },
      _after: {
        bgColor: 'button_disabled.disabled.bg',
        transition: 'none',
        borderColor: 'button_disabled.disabled.bg',
      },

      _hover: {
        transition: 'none',
        color: 'transparent',
        borderColor: 'button_disabled.disabled.bg',

        _before: {
          bgColor: 'transparent',
        },
        _after: {
          bgColor: 'transparent',
        },
      },
    },
  }
})

const closeForm = defineStyle({
  color: 'process_create.close_btn',
  fontWeight: 'normal',
  bgImage: '/assets/close-icon.svg',
  bgRepeat: 'no-repeat',
  bgSize: '10px',
  bgPosition: '15px 47%',
  pl: '30px',
})

const goBack = defineStyle({
  bgImage: '/assets/goback-icon.svg',
  bgRepeat: 'no-repeat',
  bgSize: '5px',
  bgPosition: '0px 47%',
  pl: '10px',

  '& span': {
    color: 'organization.go_back_btn',
    overflow: 'hidden',
    fontSize: 'sm',
    isTruncated: true,
    maxW: '200px',
  },
})

export const Button = defineStyleConfig({
  baseStyle,
  variants: {
    'address-dropdown': addressDropdown,
    'close-form': closeForm,
    dropdown,
    'go-back': goBack,
    icon,
    icon2,
    primary,
    process,
    secondary,
    transparent,
  },
  defaultProps: {
    colorScheme: 'primary',
    variant: 'primary',
  },
})
