import { defineStyle } from '@chakra-ui/react'
import { colors } from '../colors'

export const Button = defineStyle({
  variants: {
    link: {
      color: colors.link,
    },
    ghost: {
      _hover: {
        color: 'buttons.ghost_hover_color',
      },
    },
  },
})
