import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  background: 'white',
  fontWeight: 400,
  fontSize: 'lg',
  resize: 'none',
  border: '1px solid rgb(226, 232, 240)',
})

const outline = defineStyle({})

export const Textarea = defineStyleConfig({
  baseStyle,
  variants: { outline },
})
