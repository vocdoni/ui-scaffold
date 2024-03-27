import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  resize: 'none',
  borderRadius: 'md',
})

export const Textarea = defineStyleConfig({
  baseStyle,
})
