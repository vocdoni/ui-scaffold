import { defineStyleConfig } from '@chakra-ui/react'
export const Textarea = defineStyleConfig({
  baseStyle: {
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'secondaryGray.100',
    borderRadius: '16px',
    _placeholder: { color: 'secondaryGray.600' },
    _focus: {
      borderColor: 'none !important',
      outline: 'none !important',
    },
  },
})
