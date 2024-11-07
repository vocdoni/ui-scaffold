import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > div': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 5,
    },
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
    boxShadow: 'var(--box-shadow-darker)',
    bgColor: 'tab.variant.card.bg.light',
    borderBottom: 'none',
    borderRadius: 'xl',
    w: 'full',

    _dark: {
      bgColor: 'tab.variant.card.bg.dark',
    },

    '& > #description': {
      color: 'tab.variant.card.description.light',
      textAlign: 'start',
      fontSize: 'xs',
      _dark: {
        color: 'tab.variant.card.description.dark',
      },
    },

    '& #pro-badge': {
      bgColor: 'tab.variant.card.badge_bg',
      borderRadius: '10px',
      position: 'absolute',
      top: '3px',
      right: '3px',
      px: 4,
      color: 'badge.pro_color',
      pt: '2px',
      fontSize: '12px',
    },

    '& > #title': {
      display: 'flex',
      alignItems: 'center',
      w: 'full',
      gap: 3,
      fontSize: 'sm',

      '& p': {
        fontWeight: 'bold',
        textAlign: 'start',
      },
    },

    // Empty checkbox
    '& #empty-check': {
      position: 'absolute',
      top: 2.5,
      right: 2.5,
      w: 4,
      h: 4,
      borderRadius: 'full',
      border: `1px solid`,
      borderColor: 'tab.variant.card.border',
    },

    '& > svg': {
      w: 5,
      h: 5,
      color: 'tab.variant.card.svg',
      position: 'absolute',
      top: 2,
      right: 2,
      display: 'none',
    },

    _selected: {
      boxShadow: 'var(--box-shadow-darker)',
      '& > svg': {
        display: 'block',
      },

      '& > #empty-check': {
        display: 'none',
      },
    },
    _hover: {
      boxShadow: 'var(--box-shadow)',
    },
  },
  tabpanel: {
    p: 0,
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

const variants = {
  card,
  process,
}

export const Tabs = defineMultiStyleConfig({ variants })
