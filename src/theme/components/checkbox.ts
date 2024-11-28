import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: 4,

    _checked: {
      bgColor: 'checkbox.bg_checked',
      borderColor: 'checkbox.bg_checked',

      _hover: {
        bgColor: 'checkbox.bg_checked',
        borderColor: 'checkbox.bg_checked',
      },
    },

    _disabled: {
      border: '1px solid',
      borderColor: 'checkbox.disabled_border !important',
      opacity: 0.4,
    },
  },
  container: {
    alignItems: 'start',

    '& > span:last-of-type': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

const sm = definePartsStyle({
  control: {
    width: 4,
    height: 4,
  },
})

const md = definePartsStyle({
  control: {
    width: 5,
    height: 5,
  },
})

const radiobox = definePartsStyle({
  container: defineStyle({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 4,
    border: '1px solid',
    borderColor: 'input.drag_and_drop.border',
    bgColor: 'checkbox.variant.radiobox.bg.light',
    borderRadius: 'xl',

    _dark: {
      bgColor: 'checkbox.variant.radiobox.bg.dark',
    },

    _hover: {
      boxShadow: 'none',
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
    border: '1px solid',
    borderColor: 'checkbox.radiobox_control',

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
})
export const Checkbox = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    sm,
    md,
  },
  variants: {
    radiobox,
  },
})
