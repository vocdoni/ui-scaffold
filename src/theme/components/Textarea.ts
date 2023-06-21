import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  resize: 'none',
})

const outline = defineStyle({
  backgroundColor: 'process_create.input_bg',
})

export const Textarea = defineStyleConfig({
  baseStyle,
  variants: { outline },
})
