import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

// Manteniendo la estructura original
export const Checkbox = defineMultiStyleConfig({
  baseStyle: {
    control: {
      borderRadius: 'full',
      _checked: {
        borderColor: 'brand.500',
        bgColor: 'brand.500',
      },
      _focus: {
        boxShadow: 'none',
      },
    },
    icon: {
      color: 'white',
    },
  },
  variants: {
    radiobox: definePartsStyle((props) => ({
      container: defineStyle({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        boxShadow: 'var(--box-shadow)',
        bgColor: mode('bg.secondary.light', 'bg.secondary.dark')(props),
        borderRadius: 'xl',

        _hover: {
          boxShadow: 'var(--box-shadow-darker)',
        },
      }),
      control: defineStyle({
        position: 'absolute',
        right: 1,
        top: 1,
        rounded: 'full',
        ml: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        _checked: {
          border: 'none',
        },
      }),
      label: defineStyle({
        fontSize: 'sm',
        alignSelf: 'start',

        '& > div:first-of-type': {
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          fontWeight: 'bold',
          mb: 2,
        },

        '& > p': {
          fontSize: 'sm',
          textAlign: 'start',
        },

        //pro plan, it allows opening the modal
        '& > span': {
          borderRadius: 'xl',
          position: 'absolute',
          top: 1,
          right: 1,
          px: 2,
          bgColor: 'text.brand',
          fontSize: 'sm',
          color: 'white',
        },
        '& div:nth-of-type(2)': {
          position: 'absolute',
          h: '100%',
          w: '100%',
          top: 0,
          left: 0,
        },
      }),
    })),
  },
})
