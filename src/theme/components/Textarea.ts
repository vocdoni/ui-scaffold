import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  resize: 'none',
})

export const Textarea = defineStyleConfig({
  baseStyle,
})
