import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  resize: 'none',
  borderRadius: 0,
})

export const Textarea = defineStyleConfig({
  baseStyle,
})
