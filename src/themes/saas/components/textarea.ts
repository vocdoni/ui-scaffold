import { mode } from '@chakra-ui/theme-tools'
import { defineStyleConfig } from '@chakra-ui/react'

export const Textarea = defineStyleConfig({
  baseStyle: (props) => ({
    bg: 'transparent',
    border: '1px solid',
    borderColor: mode('secondaryGray.100', 'whiteAlpha.300')(props),
    borderRadius: '16px',
    _placeholder: { color: mode('secondaryGray.600', 'whiteAlpha.700')(props) },
    _focus: {
      outline: mode('1px solid #3965FF', '1px solid #63B3ED')(props),
      outlineOffset: '0px',
    },
  }),
})
