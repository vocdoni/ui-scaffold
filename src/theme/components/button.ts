// import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

// const primary = defineStyle((props) => {
//   const { colorScheme } = props

//   return {
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '10px',
//     bg: `${colorScheme}.500`,
//     color: 'white',

//     _hover: {
//       bg: `${colorScheme}.600`,

//       _disabled: {
//         bg: 'button.variant.primary.disabled.light.bg',
//         color: 'button.variant.primary.disabled.light.color',
//         borderColor: 'button.variant.primary.disabled.light.border',
//         opacity: 1,
//         _dark: {
//           bg: 'button.variant.primary.disabled.dark.bg',
//           color: 'button.variant.primary.disabled.dark.color',
//           borderColor: 'button.variant.primary.disabled.dark.border',
//           opacity: 0.4,
//         },
//       },
//     },
//     _active: { bg: `${colorScheme}.700` },
//     _disabled: {
//       bg: 'button.variant.primary.disabled.light.bg',
//       color: 'button.variant.primary.disabled.light.color',
//       borderColor: 'button.variant.primary.disabled.light.border',
//       opacity: 1,
//       _dark: {
//         bg: 'button.variant.primary.disabled.dark.bg',
//         color: 'button.variant.primary.disabled.dark.color',
//         borderColor: 'button.variant.primary.disabled.dark.border',
//         opacity: 0.4,
//       },
//     },
//     _dark: {
//       color: 'black',
//       bg: `${colorScheme}.200`,
//       _hover: {
//         bg: `${colorScheme}.300`,
//       },
//       _active: {
//         bg: `${colorScheme}.400`,
//       },
//     },
//   }
// })
// const outline = defineStyle((props) => {
//   const { colorScheme } = props

//   return {
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '10px',
//     border: '1px solid',
//     borderColor: `${colorScheme}.600`,
//     color: `${colorScheme}.600`,
//     textDecoration: 'none',

//     _hover: {
//       bgColor: `${colorScheme}.50`,

//       _disabled: {
//         borderColor: 'button.variant.common.disabled.border',
//         color: 'button.variant.common.disabled.color.light',

//         _dark: {
//           color: 'button.variant.common.disabled.color.dark',
//         },
//       },
//     },

//     _active: {
//       bgColor: `${colorScheme}.100`,
//     },

//     _disabled: {
//       borderColor: 'button.variant.common.disabled.border',
//       color: 'button.variant.common.disabled.color.light',

//       _dark: {
//         color: 'button.variant.common.disabled.color.dark',
//       },
//     },

//     _dark: {
//       borderColor: `${colorScheme}.200`,
//       color: `${colorScheme}.200`,

//       _hover: {
//         bgColor: `${colorScheme}.800`,
//       },
//       _active: {
//         bgColor: `${colorScheme}.900`,
//       },
//     },
//   }
// })

// const transparent = defineStyle((props) => {
//   const { colorScheme } = props
//   return {
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: `${colorScheme}.500`,

//     _hover: {
//       color: `${colorScheme}.600`,
//       bgColor: `${colorScheme}.50`,

//       _disabled: {
//         color: 'button.variant.common.disabled.color.light',
//         _dark: {
//           color: 'button.variant.common.disabled.color.dark',
//         },
//       },

//       _dark: {
//         bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.50`,
//       },
//     },

//     _active: {
//       color: `${colorScheme}.700`,

//       _dark: {
//         bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.100`,
//       },
//     },

//     _disabled: {
//       color: 'button.variant.common.disabled.color.light',
//       _dark: {
//         color: 'button.variant.common.disabled.color.dark',
//       },
//     },

//     _dark: {
//       color: 'white',
//     },
//   }
// })

// const link = defineStyle((props) => {
//   const { colorScheme } = props
//   return {
//     color: `${colorScheme}.500`,
//     textDecoration: 'underline',
//     _hover: {
//       color: `${colorScheme}.600`,
//       textDecoration: 'none',

//       _disabled: {
//         color: 'button.variant.common.disabled.color.light',

//         _dark: {
//           color: 'button.variant.common.disabled.color.dark',
//         },
//       },
//     },
//     _active: {
//       color: `${colorScheme}.700`,
//     },
//     _disabled: {
//       color: 'button.variant.common.disabled.color.light',

//       _dark: {
//         color: 'button.variant.common.disabled.color.light',
//       },
//     },

//     _dark: {
//       color: `${colorScheme}.100`,
//       _hover: {
//         color: `${colorScheme}.200`,
//       },
//       _active: {
//         color: `${colorScheme}.300`,
//       },
//     },
//   }
// })

// const underline = defineStyle((props) => {
//   const { colorScheme } = props
//   return {
//     color: colorScheme === 'gray' ? 'black' : `${colorScheme}.700`,
//     textDecoration: 'underline',

//     _hover: {
//       bgColor: colorScheme === 'gray' ? 'gray.200' : `${colorScheme}.50`,

//       _disabled: {
//         color: 'button.variant.common.disabled.color.light',
//         _dark: {
//           color: 'button.variant.common.disabled.color.dark',
//         },
//       },

//       _dark: {
//         bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.50`,
//       },
//     },
//     _disabled: {
//       color: 'button.variant.common.disabled.color.light',
//       _dark: {
//         color: 'button.variant.common.disabled.color.dark',
//       },
//     },

//     _dark: {
//       color: colorScheme === 'gray' ? 'white' : `${colorScheme}.700`,
//     },
//   }
// })

// const sizes = {
//   xl2: defineStyle({
//     px: '22px',
//     py: '16px',
//     borderRadius: '10px',
//     fontSize: 'lg',
//     fontWeight: 'semibold',
//     h: '60px',
//   }),
//   xl: defineStyle({
//     px: '18px',
//     py: '12px',
//     borderRadius: '8px',
//     fontSize: 'md',
//     h: '48px',
//   }),
//   lg: defineStyle({
//     px: '16px',
//     py: '10px',
//     borderRadius: '8px',
//     fontSize: 'md',
//     h: '44px',
//   }),
//   md: defineStyle({
//     px: '14px',
//     py: '10px',
//     borderRadius: '8px',
//     fontSize: 'sm',
//     h: '40px',
//   }),
//   sm: defineStyle({
//     px: '12px',
//     py: '8px',
//     borderRadius: '8px',
//     fontSize: 'sm',
//     h: '36px',
//   }),
// }

// export const Button = defineStyleConfig({
//   variants: {
//     primary,
//     outline,
//     transparent,
//     link,
//     underline,
//   },
//   sizes,
//   defaultProps: {
//     size: 'md',
//     colorScheme: 'brand',
//     // variant: 'outline',
//   },
// })
import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const primary = defineStyle((props) => {
  const { colorScheme } = props

  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    bg: `${colorScheme}.100`,
    color: `${colorScheme}.50`,

    _hover: {
      bg: `${colorScheme}.200`,

      _disabled: {
        bg: 'button.variant.primary.disabled.light.bg',
        color: 'button.variant.primary.disabled.light.color',
        borderColor: 'button.variant.primary.disabled.light.border',
        opacity: 1,
        _dark: {
          bg: 'button.variant.primary.disabled.dark.bg',
          color: 'button.variant.primary.disabled.dark.color',
          borderColor: 'button.variant.primary.disabled.dark.border',
          opacity: 0.4,
        },
      },
    },
    _active: { bg: `${colorScheme}.300` },
    _disabled: {
      bg: 'button.variant.primary.disabled.light.bg',
      color: 'button.variant.primary.disabled.light.color',
      borderColor: 'button.variant.primary.disabled.light.border',
      opacity: 1,
      _dark: {
        bg: 'button.variant.primary.disabled.dark.bg',
        color: 'button.variant.primary.disabled.dark.color',
        borderColor: 'button.variant.primary.disabled.dark.border',
        opacity: 0.4,
      },
    },
    _dark: {
      color: `${colorScheme}.400`,
      bg: `${colorScheme}.500`,
      _hover: {
        bg: `${colorScheme}.600`,
      },
      _active: {
        bg: `${colorScheme}.700`,
      },
    },
  }
})
const outline = defineStyle((props) => {
  const { colorScheme } = props

  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid',
    borderColor: `${colorScheme}.850`,
    color: `${colorScheme}.800`,
    textDecoration: 'none',

    _hover: {
      bgColor: `${colorScheme}.950`,

      _disabled: {
        borderColor: 'button.variant.common.disabled.border',
        color: 'button.variant.common.disabled.color.light',

        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },
    },

    _active: {
      bgColor: `${colorScheme}.1000`,
    },

    _disabled: {
      borderColor: 'button.variant.common.disabled.border',
      color: 'button.variant.common.disabled.color.light',

      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      borderColor: `${colorScheme}.1100`,
      color: `${colorScheme}.1050`,

      _hover: {
        bgColor: `${colorScheme}.1150`,
      },
      _active: {
        bgColor: `${colorScheme}.1200`,
      },
    },
  }
})

const transparent = defineStyle((props) => {
  const { colorScheme } = props
  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: `${colorScheme}.500`,

    _hover: {
      color: `${colorScheme}.600`,
      bgColor: `${colorScheme}.50`,

      _disabled: {
        color: 'button.variant.common.disabled.color.light',
        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.50`,
      },
    },

    _active: {
      color: `${colorScheme}.700`,

      _dark: {
        bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.100`,
      },
    },

    _disabled: {
      color: 'button.variant.common.disabled.color.light',
      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      color: 'white',
    },
  }
})

const link = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: `${colorScheme}.500`,
    textDecoration: 'underline',
    _hover: {
      color: `${colorScheme}.600`,
      textDecoration: 'none',

      _disabled: {
        color: 'button.variant.common.disabled.color.light',

        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },
    },
    _active: {
      color: `${colorScheme}.700`,
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',

      _dark: {
        color: 'button.variant.common.disabled.color.light',
      },
    },

    _dark: {
      color: `${colorScheme}.100`,
      _hover: {
        color: `${colorScheme}.200`,
      },
      _active: {
        color: `${colorScheme}.300`,
      },
    },
  }
})

const underline = defineStyle((props) => {
  const { colorScheme } = props
  return {
    color: colorScheme === 'gray' ? 'black' : `${colorScheme}.700`,
    textDecoration: 'underline',

    _hover: {
      bgColor: colorScheme === 'gray' ? 'gray.200' : `${colorScheme}.50`,

      _disabled: {
        color: 'button.variant.common.disabled.color.light',
        _dark: {
          color: 'button.variant.common.disabled.color.dark',
        },
      },

      _dark: {
        bgColor: colorScheme === 'gray' ? 'gray.700' : `${colorScheme}.50`,
      },
    },
    _disabled: {
      color: 'button.variant.common.disabled.color.light',
      _dark: {
        color: 'button.variant.common.disabled.color.dark',
      },
    },

    _dark: {
      color: colorScheme === 'gray' ? 'white' : `${colorScheme}.700`,
    },
  }
})

const sizes = {
  xl2: defineStyle({
    px: '22px',
    py: '16px',
    borderRadius: '10px',
    fontSize: 'lg',
    fontWeight: 'semibold',
    h: '60px',
  }),
  xl: defineStyle({
    px: '18px',
    py: '12px',
    borderRadius: '8px',
    fontSize: 'md',
    h: '48px',
  }),
  lg: defineStyle({
    px: '16px',
    py: '10px',
    borderRadius: '8px',
    fontSize: 'md',
    h: '44px',
  }),
  md: defineStyle({
    px: '14px',
    py: '10px',
    borderRadius: '8px',
    fontSize: 'sm',
    h: '40px',
  }),
  sm: defineStyle({
    px: '12px',
    py: '8px',
    borderRadius: '8px',
    fontSize: 'sm',
    h: '36px',
  }),
}

export const Button = defineStyleConfig({
  variants: {
    primary,
    outline,
    transparent,
    link,
    underline,
  },
  sizes,
  defaultProps: {
    size: 'md',
    colorScheme: 'brand',
    // variant: 'outline',
  },
})
