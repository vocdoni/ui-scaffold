import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const dropdown = defineStyle({
  borderRadius: 'none',
  w: 'full',

  _hover: {
    bgColor: 'button.drop_down.hover',
  },

  _active: {
    bgColor: 'button.drop_down.active',
  },
})

export const Button = defineStyleConfig({
  variants: { dropdown },
})
