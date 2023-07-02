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

const variants = {
  card,
}

export const Tabs = defineMultiStyleConfig({ variants })
