import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 10,
    borderBottom: 'none',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 2,
    width: '220px',
    height: '190px',
    p: 4,
    px: 6,
    bgColor: 'white',
    boxShadow: '2px 4px 8px lightgray',
    borderRadius: 'md',
    borderBottom: 'none',
    color: 'process_create.tabs.card.color',

    _active: {
      boxShadow: '1px 2px 4px lightgray',
    },

    '& > p:nth-of-type(1)': {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.6)',
    },

    _selected: {
      boxShadow: '1px 2px 4px lightgray',
      '& > p:first-of-type': {
        color: 'process_create.tabs.card.selected_color',
      },
    },
  },
})
const process = definePartsStyle({
  root: {
    w: { base: '100%', lg: '70%' },
  },
  tab: {
    position: 'relative',
    whiteSpace: 'nowrap',
    color: 'process.tabs.color',
    fontWeight: 'normal',
    borderTopRadius: 'md',

    '&:after': {
      content: "''",
      position: 'absolute',
      mr: '-100.3%',
      h: '28px',
      borderRight: '1px solid',
      borderColor: 'process.tabs.divider',
    },

    '&:last-of-type:after': {
      content: "''",
      display: 'none',
    },

    _hover: {
      bgColor: 'process.tabs.hover',

      '&:after': {
        content: "''",
        display: 'none',
      },
    },
    _active: {
      bgColor: 'process.tabs.active',
    },
    _selected: {
      fontWeight: 'bold',
      borderBottom: '1px solid',
      borderColor: 'process.tabs.selected_border',
    },
  },
  tablist: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'process.tabs.list_border_bottom',
  },
})
const organization = definePartsStyle({
  root: {
    justifyContent: 'center',
  },
  tab: {
    position: 'relative',
    whiteSpace: 'nowrap',
    color: 'organization.tabs.color',
    fontWeight: 'normal',
    borderTopRadius: 'md',

    '&:after': {
      content: "''",
      position: 'absolute',
      mr: '-100.3%',
      h: '28px',
      borderRight: '1px solid',
      borderColor: 'organization.tabs.divider',
    },

    '&:last-of-type:after': {
      content: "''",
      display: 'none',
    },

    // tab circle number
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgColor: 'organization.tabs.circle_bg',
      color: 'white',
      fontWeight: 'bold',
      ml: 2,

      px: 1,
      borderRadius: 'md',
      height: '100%',
    },

    _hover: {
      bgColor: 'organization.tabs.hover',

      '&:after': {
        content: "''",
        display: 'none',
      },
    },
    _active: {
      bgColor: 'organization.tabs.active',
    },
    _selected: {
      fontWeight: 'bold',
      borderBottom: '1px solid',
      borderColor: 'organization.tabs.selected_border',
    },
  },
  tablist: {
    position: 'sticky',
    display: 'flex',
    top: '72px',
    zIndex: 10,
    alignItems: 'end',
    borderBottom: '1px solid',
    borderColor: 'process.tabs.list_border_bottom',
  },
})

const variants = {
  card,
  process,
  organization,
}

export const Tabs = defineMultiStyleConfig({ variants })
