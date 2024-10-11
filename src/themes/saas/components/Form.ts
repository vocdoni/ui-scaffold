import { mode } from '@chakra-ui/theme-tools'
import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Form: ComponentStyleConfig = {
  parts: ['container', 'label', 'helpText', 'errorText', 'requiredIndicator'],
  baseStyle: (props) => ({
    container: {
      label: {
        display: 'flex',
        ms: 1,
        fontSize: 'sm',
        fontWeight: 'bold',
        mb: 2,
        color: mode('gray.800', 'white')(props),
      },
    },
  }),
  variants: {
    calendar: (props) => ({
      container: {
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
        border: mode('1px solid #E2E8F0', '0.1px solid white')(props),
        bgColor: mode('input.bg.light', 'input.bg.dark')(props),
        borderRadius: 'xl',
        minW: 64,
        maxW: 64,
        p: 3,

        _hover: {
          outline: mode('1px solid #E2E8F0', '.1px solid white')(props),
          outlineOffset: '0px',
        },

        label: {
          m: 0,
          w: 'full',
          '& > span:nth-of-type(2)': {
            mt: 1,
            color: mode('black', 'white')(props),
            fontWeight: 'normal',
            fontSize: 'sm',
          },
        },
      },
    }),
  },
}
