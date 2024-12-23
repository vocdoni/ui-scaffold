import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: {
    borderRadius: 'lg',

    bgColor: 'text_area_bg !important',

    _dark: {
      bgColor: 'transparent !important',
    },
  },
})
