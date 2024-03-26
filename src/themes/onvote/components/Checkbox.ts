import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import checkIcon from '/assets/check-icon.svg'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)
const baseStyle = definePartsStyle({
  control: {
    borderRadius: 0,

    '&[data-checked=""]': {
      background: 'checkbox',
      bgImage: checkIcon,
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

    '& > div:first-of-type': {
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
    //pro plan, it allows opening the modal
    '& > span': {
      bgColor: 'process_create.pro_bg',
      borderRadius: '10px',
      position: 'absolute',
      top: '3px',
      right: '3px',
      px: 2,
      color: 'process_create.pro_color',
      fontSize: '12px',
      lineHeight: '24px',
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
  variants: { radiobox },
})
