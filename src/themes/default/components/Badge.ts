import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  background: 'process_create.spreadsheet.badge.bg',
  color: 'process_create.spreadsheet.badge.text',
  borderRadius: 'lg',
  py: 0.5,
  px: 2,
  textTransform: 'capitalize',
  fontSize: 'md',
  fontWeight: 'normal',
})

export const Badge = defineStyleConfig({
  variants: { primary },
})
