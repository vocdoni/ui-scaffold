import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)
const baseStyle = definePartsStyle({
  control: {
    borderRadius: 0,

    '&::checked': {
      bgColor: 'red',
    },
    '&[data-checked=""]': {
      background: 'checkbox',
      borderColor: 'checkbox',
      bgImage: '/assets/check-icon.svg',
      bgSize: '10px',
      bgRepeat: 'no-repeat',
      bgPosition: 'center',
    },

    '& svg': {
      display: 'none',
    },
  },
})
const radiobox = definePartsStyle({
  container: defineStyle({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    p: 4,
    bgColor: 'process_create.advanced_checkbox_bg',

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
    },
    border: '1px solid',
    borderColor: 'process_create.advanced_checkbox_border',
  }),
  control: defineStyle({
    position: 'absolute',
    right: 1,
    top: 1,
    borderRadius: 0,
    ml: 'auto',
  }),
  label: defineStyle({
    fontSize: 'sm',
    alignSelf: 'start',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontWeight: 'bold',
      mb: 2,

      '& p': {
        fontFamily: 'pixeloidsans',
        textTransform: 'uppercase',
      },
    },

    '& > p': {
      fontSize: '14px',
      color: 'process_create.description',
    },
  }),
})

export const Checkbox = defineMultiStyleConfig({
  baseStyle,
  variants: { radiobox },
})
