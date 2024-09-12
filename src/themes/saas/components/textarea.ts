import { mode } from '@chakra-ui/theme-tools'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
export const Textarea = defineStyleConfig({
  baseStyle: {
    fontWeight: 400,
    height: '50px',
    resize: 'none',
    borderRadius: '16px',
    _focusVisible: {
      borderColor: 'red !important',
      boxShadow: '0 0 0 0 transparent !important',
    },
  },

  variants: {
    main: (props: any) => ({
      field: {
        bg: mode('transparent', 'navy.800')(props),
        border: '1px solid !important',
        color: mode('secondaryGray.900', 'white')(props),
        borderColor: mode('secondaryGray.100', 'whiteAlpha.100')(props),
        borderRadius: '16px',
        fontSize: 'sm',
        p: '20px',
        _placeholder: { color: 'secondaryGray.400' },
      },
    }),
    auth: () => ({
      field: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'secondaryGray.100',
        borderRadius: '16px',
        _placeholder: { color: 'secondaryGray.600' },
        _focus: {
          borderColor: 'none !important',
          outline: 'none !important',
        },
      },
    }),
    authSecondary: () => ({
      field: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'secondaryGray.100',
        borderRadius: '16px',
        _placeholder: { color: 'secondaryGray.600' },
      },
    }),
    search: () => ({
      field: {
        border: 'none',
        py: '11px',
        borderRadius: 'inherit',
        _placeholder: { color: 'secondaryGray.600' },
      },
    }),
  },
})
