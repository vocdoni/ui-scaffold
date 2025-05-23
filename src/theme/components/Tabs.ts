import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, TabPanel } from '@chakra-ui/react'
import { BiBorderRadius } from 'react-icons/bi'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const brand = definePartsStyle(({ colorScheme }: { colorScheme: string }) => ({
  tab: {
    borderRadius: 'lg',
    _selected: {
      bgColor: `${colorScheme}.200`,
      _dark: {
        bgColor: `${colorScheme}.300`,
      },
    },
  },
  tablist: {
    bgColor: `${colorScheme}.500`,
    p: 1,
    _dark: {
      bgColor: `${colorScheme}.600`,
    },
  },
}))

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    columnGap: '5%',
    rowGap: 8,
    '& > div': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 5,
    },
    bgColor: 'transparent',
  },
  tab: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    gap: 2,
    flex: { md: '0 0 30%' },
    p: 4,
    px: 6,
    boxShadow: 'var(--box-shadow)',
    bgColor: 'tab.variant.card.bg.light',
    borderBottom: 'none',
    borderRadius: 'xl',
    w: 'full',

    '& > svg': {
      w: 5,
      h: 5,
      color: 'tab.variant.card.svg',
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      display: 'none',
    },

    _selected: {
      boxShadow: 'var(--box-shadow)',
      '& > svg': {
        display: 'block',
      },
      '& > .empty': {
        display: 'none',
      },
      _dark: {
        boxShadow: 'var(--box-shadow-dark-mode)',
      },
    },
    _hover: {
      boxShadow: 'none',
    },
    _dark: {
      bgColor: 'tab.variant.card.bg.dark',
      boxShadow: 'none',
    },
    '&:nth-of-type(2)': {
      mr: 'auto',
    },
  },
  tabpanel: {
    bgColor: 'tab.variant.card.bg.light',
    borderRadius: 'xl',
    _dark: {
      bgColor: 'tab.variant.card.bg.dark',
    },
  },
})

const process = definePartsStyle({
  root: {},
  tabpanel: {
    px: { base: 0, sm: 4 },
    mb: 0,
  },
  tab: {
    position: 'relative',
    whiteSpace: 'nowrap',
    color: 'process.tabs.color',
    fontWeight: 'normal',
    borderTopRadius: 'md',
    fontSize: 'lg',
    _hover: {
      bgColor: 'process.tabs.hover',
    },
    _active: {
      bgColor: 'process.tabs.active_bg',
    },
    _selected: {
      fontWeight: 'bold',
      borderBottom: '1px solid',
    },
  },
  tablist: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'process.tabs.border_bottom_list',
  },
})

const basic = ({ colorScheme }: { colorScheme: string }) => ({
  tablist: {
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    p: 1,
    _dark: {
      backgroundColor: 'transparent',
      bgColor: `${colorScheme}.700`,
    },
  },

  tab: {
    mb: '.3px',

    _selected: {
      fontWeight: 'semibold',
      bgColor: `${colorScheme}.100`,
      color: `${colorScheme}.800`,
    },
  },
})

const underline = ({ colorScheme }: { colorScheme: string }) => ({
  tablist: {
    display: 'flex',
    justifyContent: 'center',
    p: 1,
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
      fontWeight: 'extrabold',
      backgroundColor: 'transparent',
      borderColor: `${colorScheme}.600`,
      color: `${colorScheme}.600`,
      _dark: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        color: 'white',
      },
    },
    _dark: {
      backgroundColor: 'transparent',
    },
  },
})

const settings = ({ colorScheme }: { colorScheme: string }) => ({
  tablist: {
    p: 1,
    bgColor: '#f5f5f5',
    borderRadius: 'sm',
    w: 'fit-content',
  },
  tab: {
    py: 1.5,
    px: 3,
    borderRadius: 'sm',
    fontWeight: 'bold',
    color: 'rgb(115, 115, 115)',
    fontSize: '14px',
    _selected: {
      bgColor: 'white',
      color: 'black',
    },
  },
  tabpanel: {
    borderRadius: 'md',
    boxShadow: '0 1px 2px 0 rgb(0 0 0/0.05)',
    border: 'var(--border)',
    p: 6,
  },
})

export const Tabs = defineMultiStyleConfig({
  variants: { card, process, brand, basic, underline, settings },
  defaultProps: { colorScheme: 'brand', variant: 'underline' },
})
