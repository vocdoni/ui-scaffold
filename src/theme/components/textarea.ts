import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: {
    borderRadius: 'lg',

    bgColor: 'text_area.bg.light !important',

    _dark: {
      bgColor: 'transparent !important',
    },
  },
})
