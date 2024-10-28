import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Form: ComponentStyleConfig = {
  parts: ['container', 'label', 'helpText', 'errorText', 'requiredIndicator'],
  baseStyle: {
    container: {
      label: {
        display: 'flex',
        ms: 1,
        fontSize: 'sm',
        fontWeight: 'bold',
        mb: 2,
      },
    },
  },
  variants: {
    calendar: {
      container: {
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
        backgroundColor: 'process_create.calendar_bg.light',
        border: '1px solid',
        borderColor: 'input.border.light',
        borderRadius: 'xl',
        minW: 64,
        maxW: 64,
        p: 3,

        _hover: {
          outline: '1px solid',
          outlineColor: 'input.hover.light',
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

        _dark: {
          backgroundColor: 'process_create.calendar_bg.dark',
          border: '0.1px solid',
          borderColor: 'input.border.dark',

          _hover: {
            outline: '.1px solid',
            outlineColor: 'input.hover.dark',
          },
        },
      },
    },
  },
}
