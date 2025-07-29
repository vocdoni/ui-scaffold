import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  fontSize: 'md',
  _placeholder: {
    color: 'input.placeholder',
    fontSize: 'md',
  },
})

export const Textarea = defineStyleConfig({
  baseStyle,
})
