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
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'md',
    borderBottom: 'none',
    color: 'process_create.tabs.card.color',

    '& > p:nth-of-type(1)': {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.6)',
    },

    _selected: {
      boxShadow: 'var(--box-shadow-darker)',
      '& > p:first-of-type': {
        color: 'process_create.tabs.card.selected_color',
      },
    },
    _focus: {
      outline: '2px solid #8DC2ED',
    },
  },
})
const process = definePartsStyle({
  root: {
    w: { base: '100%', xl: '70%' },
  },
  tab: {
    position: 'relative',
    whiteSpace: 'nowrap',
    color: 'process.tabs.color',
    fontWeight: 'normal',
    borderTopRadius: 'md',
    fontSize: 'lg',

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

const variants = {
  card,
  process,
}

export const Tabs = defineMultiStyleConfig({ variants })
