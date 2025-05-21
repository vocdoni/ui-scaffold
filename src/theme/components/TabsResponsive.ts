import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const TabsResponsive: ComponentStyleConfig = {
  parts: ['container', 'selectWrapper', 'tabs', 'tabList', 'tab', 'tabPanels', 'tabPanel'],
  baseStyle: ({ colorScheme, size }) => ({
    selectWrapper: {
      display: { md: 'none' },
      maxW: 'fit-content',
      mx: 'auto',
    },
    tabList: {
      display: { base: 'none', md: 'flex' },
      p: 1,
    },
  }),
  variants: {
    basic: ({ colorScheme, size }) => ({
      tabList: {
        bgColor: `${colorScheme}.500`,
        border: 'none',
        _dark: {
          bgColor: `${colorScheme}.600`,
        },
      },
      tab: {
        borderRadius: size === 'sm' ? 'md' : size === 'lg' ? 'xl' : 'lg',
        mb: '.3px',
        _selected: {
          bgColor: `${colorScheme}.200`,
          _dark: {
            bgColor: `${colorScheme}.300`,
          },
        },
      },
    }),
    underline: ({ colorScheme }) => ({
      tabList: {
        backgroundColor: 'transparent',
        border: 'none',

        _dark: {
          backgroundColor: 'transparent',
        },
      },
      tab: {
        borderRadius: 'none',
        borderBottom: '1px solid transparent',
        borderColor: 'tab.responsive_tab.underline_border',
        _selected: {
          borderColor: `${colorScheme}.400`,
          borderBottomWidth: '2px',
          _dark: {
            borderColor: `${colorScheme}.600`,
          },
        },
      },
    }),
  },
  sizes: {
    sm: {
      tab: {
        borderRadius: 'md',
      },
    },
    md: {
      tab: {
        borderRadius: 'lg',
      },
    },
    lg: {
      tab: {
        borderRadius: 'xl',
      },
    },
  },
  defaultProps: { variant: 'basic' },
}
