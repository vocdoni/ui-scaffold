import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const radiobox = definePartsStyle({
  container: defineStyle({
    display: 'flex',
    flexDirection: 'column',
    width: 32,
    height: 24,
    p: 2,
    boxShadow: 'var(--box-shadow)',
    bgColor: 'process_create.checkbox_radiobox_bg',
    borderRadius: 'md',

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
    },
  }),
  control: defineStyle({
    rounded: 'full',
    ml: 'auto',
  }),
  label: defineStyle({
    m: 0,
  }),
})

export const Checkbox = defineMultiStyleConfig({
  variants: { radiobox },
})
