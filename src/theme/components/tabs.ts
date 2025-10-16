import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

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

const settings = definePartsStyle({
  tablist: {
    p: 1,
    bgColor: 'tabs.bg',
    borderRadius: 'sm',
    w: 'fit-content',
    maxWidth: 'full',
    overflowX: 'auto',
  },
  tab: {
    py: 1.5,
    px: 3,
    whiteSpace: 'nowrap',
    borderRadius: 'sm',
    fontWeight: 'medium',
    color: 'tabs.tab.color',
    fontSize: 'sm',
    _selected: {
      bgColor: 'tabs.tab.active.bg',
      color: 'tabs.tab.active.color',
      boxShadow: '0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a',
    },
  },
  tabpanel: {
    borderRadius: 'md',
    p: 6,
  },
})

export const Tabs = defineMultiStyleConfig({
  variants: { card, settings },
  defaultProps: { variant: 'settings' },
})
