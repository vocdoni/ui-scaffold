import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

export const Checkbox = defineMultiStyleConfig({
  baseStyle: {
    control: {
      borderRadius: 'full',
      _checked: {
        borderColor: 'checkbox.checked.border',
        bgColor: 'checkbox.checked.bg',

        _hover: {
          borderColor: 'checkbox.checked.border',
          bgColor: 'checkbox.checked.bg',
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    },
    icon: {
      color: 'checkbox.icon',
    },
  },
  variants: {
    radiobox: definePartsStyle({
      container: defineStyle({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        boxShadow: 'var(--box-shadow)',
        bgColor: 'checkbox.variant.radiobox.bg.light',
        borderRadius: 'xl',

        _dark: {
          bgColor: 'checkbox.variant.radiobox.bg.dark',
        },

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
          bgColor: 'checkbox.bg',
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
    }),
  },
})
