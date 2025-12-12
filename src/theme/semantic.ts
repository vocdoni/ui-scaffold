/**
 * Semantic tokens allow us to define tokens, like colors, based on their usage
 * https://v2.chakra-ui.com/docs/styled-system/semantic-tokens
 */

const chakra = {
  body: {
    bg: {
      _dark: 'black.650',
      _light: 'white',
    },
  },
}

const texts = {
  primary: {
    _light: 'black',
    _dark: 'white',
  },
  subtle: {
    _light: 'gray.500',
    _dark: 'gray.400',
  },
  dark: {
    default: 'gray.600',
    _dark: 'gray.500',
  },
}

export const colors = {
  chakra,
  auth: {
    bg: {
      _dark: 'black.550',
      _light: 'gray.50',
    },
    card: {
      bg: {
        _dark: 'black',
        _light: 'white',
      },
      border: 'gray.200',
    },
  },
  card: {
    pricing: {
      bg: {
        default: chakra.body.bg._light,
        _dark: chakra.body.bg._dark,
      },
      border: {
        default: 'gray.200',
        _dark: 'black.700',
      },
      current: {
        bg: {
          default: 'gray.100',
          _dark: 'black.600',
        },
        color: {
          default: 'black',
          _dark: 'white',
        },
      },
      featured: {
        bg: 'gray.800',
        badge: {
          bg: {
            default: 'black',
            _dark: 'white',
          },
          color: {
            default: 'white',
            _dark: 'black',
          },
        },
        border: {
          default: 'black',
          _dark: 'white',
        },
      },
    },
  },
  dashboard: {
    menu: {
      default: '#fbfbfb',
      _dark: '#18181b',
    },
  },
  input: {
    placeholder: 'gray.500',
  },
  table: {
    border: {
      _light: 'gray.200',
      _dark: 'black.700',
    },
  },
  tabs: {
    tab: {
      color: {
        _light: 'gray.500',
        _dark: 'gray.400',
      },
      active: {
        color: {
          _light: 'black',
          _dark: 'white',
        },
        bg: {
          _light: 'white',
          _dark: 'black',
        },
      },
    },
    bg: {
      _light: 'gray.100',
      _dark: 'black.700',
    },
  },
  texts,
  button: {
    primary: {
      bg: {
        _light: 'black.500',
        _dark: 'white',
      },
      color: {
        _light: 'white',
        _dark: 'black.500',
      },
      hover: {
        bg: {
          _light: 'black.600',
          _dark: 'gray.100',
        },
      },
      active: {
        bg: {
          _light: 'black.700',
          _dark: 'gray.200',
        },
      },
    },
    secondary: {
      border: {
        _light: 'gray.300',
        _dark: 'gray.600',
      },
      color: {
        _light: 'black',
        _dark: 'white',
      },
      hover: {
        bg: {
          _light: 'gray.50',
          _dark: 'gray.700',
        },
      },
    },
    danger: {
      bg: {
        _light: 'red.500',
        _dark: 'red.600',
      },
      color: 'white',
      hover: {
        bg: {
          _light: 'red.600',
          _dark: 'red.700',
        },
      },
    },
    ghost: {
      hover: {
        bg: {
          _light: 'gray.100',
          _dark: 'gray.700',
        },
      },
    },
  },
}

const semanticTokens = {
  colors,
  fontWeights: {
    normal: 300,
    bold: 400,
  },
}

export default semanticTokens
