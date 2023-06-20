import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  fontWeight: 400,
  fontSize: 'lg',
  resize: 'none',
  border: '1px solid rgb(226, 232, 240)',
})

const outline = defineStyle({
  background: 'white',
})

export const Textarea = defineStyleConfig({
  baseStyle,
  variants: { outline },
})
