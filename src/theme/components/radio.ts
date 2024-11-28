import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: 'full',

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

export const Radio = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    sm,
    md,
  },
})
