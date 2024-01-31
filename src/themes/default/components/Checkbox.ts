import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: 'full',

    '&[data-checked=""]': {
      background: 'checkbox',
    },
  },
})

const radiobox = definePartsStyle({
  container: defineStyle({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    p: 4,
    boxShadow: 'var(--box-shadow)',
    bgColor: 'process_create.advanced_checkbox_bg',
    borderRadius: 'md',

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
  }),
  label: defineStyle({
    fontSize: 'sm',
    alignSelf: 'start',

    '& div:first-of-type': {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontWeight: 'bold',
      mb: 2,
    },

    '& > p': {
      fontSize: '12px',
      color: 'process_create.description',
    },

    '& div:nth-of-type(2)': {
      mt: 2,
      fontSize: '12px',
      color: 'process_create.description',

      '& span:first-of-type': {
        fontWeight: 'bold',
      },
    },
  }),
})

export const Checkbox = defineMultiStyleConfig({
  baseStyle,
  variants: { radiobox },
})
