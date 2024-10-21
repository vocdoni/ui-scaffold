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
        'background-color': mode('input.light.bg', '#303B4D')(props),
        border: mode('1px solid', '0.1px solid')(props),
        borderColor: mode('input.light.outline', 'input.dark.outline')(props),
        borderRadius: 'xl',
        minW: 64,
        maxW: 64,
        p: 3,

        _hover: {
          outline: mode('1px solid', '.1px solid')(props),
          outlineColor: mode('input.light.outline', 'input.dark.outline')(props),
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
