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
      },
    },
  }),
  variants: {
    calendar: (props) => ({
      container: {
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
        backgroundColor: mode('process_create.calendar_bg.light', 'process_create.calendar_bg.dark')(props),
        border: mode('1px solid', '0.1px solid')(props),
        borderColor: mode('input.border.light', 'input.border.dark')(props),
        borderRadius: 'xl',
        minW: 64,
        maxW: 64,
        p: 3,

        _hover: {
          outline: mode('1px solid', '.1px solid')(props),
          outlineColor: mode('input.hover.light', 'input.hover.dark')(props),
          outlineOffset: '0px',
        },

        label: {
          m: 0,
          w: 'full',
          '& > span:nth-of-type(2)': {
            mt: 1,
            fontWeight: 'normal',
            fontSize: 'sm',
          },
        },
      },
    }),
  },
}
