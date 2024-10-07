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
        border: '1px solid',
        borderColor: '#CBD5E0',
        borderRadius: 'xl',
        minW: 56,
        maxW: 56,
        p: 3,

        label: {
          m: 0,
          fontSize: 'md',
          color: mode('black', 'white')(props),

          '& p': {
            mt: 1,
          },
        },
      },
    }),
    custom_data_weighted_vote: (props) => ({
      container: {
        fontWeight: 'light',
        borderRadius: 'xl',
        bgColor: mode('bg.secondary.light', 'bg.secondary.dark')(props),
      },
    }),
  },
}
