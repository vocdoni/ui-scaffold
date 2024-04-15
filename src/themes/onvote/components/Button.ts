import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  borderRadius: 0,
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
const solid = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...onVoteCommonStyles.common,
    bgColor: `${colorScheme}.600`,
    color: 'white',
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
      bgColor: `${colorScheme}.800`,
      borderColor: `${colorScheme}.800`,
      _before: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.800`,
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.800`,
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
    bgColor: 'white',
    color: `${colorScheme}.600`,
    borderColor: 'white',

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: 'white',
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: 'white',
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
      color: `${colorScheme}.800`,
      _before: {
        ...onVoteCommonStyles.active,
      },

      _after: {
        ...onVoteCommonStyles.active,
      },
    },

    _disabled: {
      bgColor: 'white !important',
      color: 'button_disabled.color',
      borderColor: 'white',

      _before: {
        bgColor: 'white',
        transition: 'none',
      },
      _after: {
        bgColor: 'white ',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        borderColor: 'white',
        color: 'button_disabled.color',

        _before: {
          width: '100%',
          bgColor: 'white',
        },
        _after: {
          width: '100%',
          bgColor: 'white',
        },
      },
    },
  }
})
const ghost = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...onVoteCommonStyles.common,
    bgColor: 'white',
    color: `${colorScheme}.600`,
    borderColor: 'white',

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: 'white',
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: 'white',
    },

    _hover: {
      bgColor: `${colorScheme}.200`,
      color: `${colorScheme}.700`,
      borderColor: `${colorScheme}.200`,

      _before: {
        ...onVoteCommonStyles.hover,
        bgColor: `${colorScheme}.200`,
      },

      _after: {
        ...onVoteCommonStyles.hover,
        bgColor: `${colorScheme}.200`,
      },
    },

    _active: {
      bgColor: `${colorScheme}.300`,
      color: `${colorScheme}.800`,
      borderColor: `${colorScheme}.300`,

      _before: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.300`,
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.300`,
      },
    },

    _disabled: {
      bgColor: 'white !important',
      color: 'button_disabled.color',
      borderColor: 'button_disabled.color',

      _before: {
        bgColor: 'button_disabled.color',
        transition: 'none',
      },
      _after: {
        bgColor: 'button_disabled.color',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        borderColor: 'button_disabled.color',
        color: 'button_disabled.color',

        _before: {
          width: '100%',
          bgColor: 'button_disabled.color',
        },
        _after: {
          width: '100%',
          bgColor: 'button_disabled.color',
        },
      },
    },
  }
})
const outline = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...onVoteCommonStyles.common,
    bgColor: 'white',
    color: `${colorScheme}.600`,
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
      bgColor: 'white',
      color: `${colorScheme}.700`,
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
      bgColor: 'white',
      color: `${colorScheme}.800`,
      borderColor: `${colorScheme}.800`,

      _before: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.800`,
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: `${colorScheme}.800`,
      },
    },

    _disabled: {
      bgColor: 'white !important',
      color: 'button_disabled.color',
      borderColor: 'button_disabled.color',

      _before: {
        bgColor: 'button_disabled.color',
        transition: 'none',
      },
      _after: {
        bgColor: 'button_disabled.color',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        borderColor: 'button_disabled.color',
        color: 'button_disabled.color',

        _before: {
          width: '100%',
          bgColor: 'button_disabled.color',
        },
        _after: {
          width: '100%',
          bgColor: 'button_disabled.color',
        },
      },
    },
  }
})
const addressDropdown = defineStyle({
  ...onVoteCommonStyles.common,
  minW: 44,
  bgColor: 'black',
  color: 'white',
  borderColor: 'black',

  _before: {
    ...onVoteCommonStyles.before,
    bgColor: 'black',
  },

  _after: {
    ...onVoteCommonStyles.after,
    bgColor: 'black',
  },

  _hover: {
    bgColor: 'black',
    borderColor: 'black',

    _before: {
      ...onVoteCommonStyles.hover,
      bgColor: 'black',
    },

    _after: {
      ...onVoteCommonStyles.hover,
      bgColor: 'black',
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
  const { colorScheme } = props
  return {
    bgColor: 'transparent',
    fontFamily: 'pixeloidsans, monospace',
    color: `${colorScheme}.500`,
    fontWeight: 'normal',

    _hover: {
      bgColor: 'transparent',
      color: `${colorScheme}.600`,
    },
    _active: {
      bgColor: 'transparent',
      color: `${colorScheme}.700`,
    },
  }
})
const closeForm = defineStyle({
  color: 'process_create.close_btn',
  fontWeight: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  alignItems: 'center',

  '& img': {
    mb: '3px',
  },
})
const goBack = defineStyle((props) => {
  const { colorScheme } = props
  return {
    px: 2,
    fontWeight: 'normal',

    '& svg': {
      m: 0,
      ml: 1,
    },
    '& span': {
      color: `${colorScheme}.500`,
      overflow: 'hidden',
      fontSize: 'sm',
      isTruncated: true,
      maxW: '200px',
      ml: 2,
    },
  }
})

const tryItNow = defineStyle({
  background: 'web3_cta.onvote',
  color: 'white',
  px: 8,
  height: 9,
  fontWeight: 'normal',
  borderRadius: 'var(--chakra-radii-md)',
  fontSize: { base: '13px' },
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px',
})
const dashboard = defineStyle((props) => {
  const { colorScheme } = props
  return {
    py: 6,
    mb: 2,
    _hover: {
      bgColor: `${colorScheme}.300`,
      color: 'white',

      _disabled: {
        color: 'gray.800',
      },
    },

    _active: {
      bgColor: `${colorScheme}.500`,
      color: 'white',

      _disabled: {
        bgColor: `${colorScheme}.500`,
        color: 'white',
      },
    },
  }
})

const buy = defineStyle((props) => {
  return {
    border: '1px solid white',
    borderRadius: 'xl',
    px: 8,
    bgColor: 'transparent',
    gap: 2,
    _hover: {
      bgColor: 'white',
      color: '#4569D6',
      borderColor: '#4569D6',
    },
  }
})
export const Button = defineStyleConfig({
  baseStyle,
  variants: {
    solid,
    'address-dropdown': addressDropdown,
    buy,
    'close-form': closeForm,
    dashboard,
    ghost,
    outline,
    'go-back': goBack,
    secondary,
    transparent,
    'try-it-now': tryItNow,
  },
  defaultProps: {
    colorScheme: 'primary',
  },
})
