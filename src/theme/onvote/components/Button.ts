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
    fontFamily: 'pixeloid',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderLeft: '5px solid',
    borderRight: '5px solid',
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
    width: 'calc(100% + 10px)',
  },

  active: {
    width: '100%',
  },
}
const onVotePrimary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    ...onVoteCommonStyles.common,
    bgColor: colorScheme === 'black' ? 'button.black' : 'button.main',
    color: 'button.color',
    borderColor: colorScheme === 'black' ? 'button.black' : 'button.main',

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: colorScheme === 'black' ? 'button.black' : 'button.main',
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: colorScheme === 'black' ? 'button.black' : 'button.main',
    },

    _hover: {
      bgColor: colorScheme === 'black' ? 'button.black' : 'button.dark',
      borderColor: colorScheme === 'black' ? 'button.black' : 'button.dark',

      _before: {
        ...onVoteCommonStyles.hover,
        bgColor: colorScheme === 'black' ? 'button.black' : 'button.dark',
      },

      _after: {
        ...onVoteCommonStyles.hover,
        bgColor: colorScheme === 'black' ? 'button.black' : 'button.dark',
      },
    },

    _active: {
      bgColor: colorScheme === 'black' ? 'button.black' : 'button.main',
      borderColor: colorScheme === 'black' ? 'button.black' : 'button.light',
      _before: {
        ...onVoteCommonStyles.active,
        bgColor: colorScheme === 'black' ? 'button.black' : 'button.light',
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: colorScheme === 'black' ? 'button.black' : 'button.light',
      },
    },

    _disabled: {
      bgColor: 'button.disabled.bg',
      color: 'button.disabled.color',
      border: 'none',

      _before: {
        bgColor: 'button.disabled.bg',
        transition: 'none',
        borderColor: 'button.disabled.bg',
      },
      _after: {
        bgColor: 'button.disabled.bg',
        transition: 'none',
        borderColor: 'button.disabled.bg',
      },

      _hover: {
        transition: 'none',
        color: 'transparent',
        borderColor: 'button.disabled.bg',

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

const onVoteSecondary = defineStyle((props) => {
  return {
    ...onVoteCommonStyles.common,
    bgColor: 'button.ghost.bg',
    color: 'button.ghost.color',
    borderColor: 'button.ghost.bg',

    _before: {
      ...onVoteCommonStyles.before,
      bgColor: 'button.ghost.bg',
    },

    _after: {
      ...onVoteCommonStyles.after,
      bgColor: 'button.ghost.bg',
    },

    _hover: {
      color: 'button.ghost.color_hover',
      _before: {
        ...onVoteCommonStyles.hover,
      },

      _after: {
        ...onVoteCommonStyles.hover,
      },
    },

    _active: {
      borderColor: 'button.ghost.border_active',
      _before: {
        ...onVoteCommonStyles.active,
        bgColor: 'button.ghost.border_active',
      },

      _after: {
        ...onVoteCommonStyles.active,
        bgColor: 'button.ghost.border_active',
      },
    },

    _disabled: {
      bgColor: 'button.disabled.bg',
      color: 'button.disabled.color',

      _before: {
        bgColor: 'button.disabled.bg',
        transition: 'none',
      },
      _after: {
        bgColor: 'button.disabled.bg',
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
export const Button = defineStyleConfig({
  baseStyle,
  variants: { 'onvote-primary': onVotePrimary, process, 'onvote-secondary': onVoteSecondary },
})
