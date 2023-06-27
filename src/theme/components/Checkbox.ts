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
    boxShadow: '2px 4px 8px lightgray',
    borderRadius: 'md',
    _active: {
      boxShadow: '1px 2px 4px lightgray',
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
