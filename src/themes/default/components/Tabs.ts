import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    flexDirection: 'column',
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
    boxShadow: 'var(--box-shadow)',
    bgColor: 'process_create.advanced_checkbox_bg',
    borderBottom: 'none',
    color: 'process_create.description',
    borderRadius: 'md',

    '& > #description': {
      color: 'process_create.description',
      textAlign: 'start',
      fontSize: 'xs',
    },

    '& #pro-badge': {
      bgColor: 'process_create.pro_bg',
      borderRadius: '10px',
      position: 'absolute',
      top: '3px',
      right: '3px',
      px: 4,
      color: 'process_create.pro_color',
      pt: '2px',
      fontSize: '12px',
    },

    '& > #title': {
      display: 'flex',
      alignItems: 'center',
      w: 'full',
      gap: 3,
      fontSize: 'sm',
      color: 'black',

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
      border: '1px solid lightgray',
    },

    '& > svg': {
      w: 5,
      h: 5,
      color: 'checkbox.selected',
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
      boxShadow: 'var(--box-shadow-darker)',
    },
  },
})
const process = definePartsStyle({
  root: {},
  tabpanel: {
    px: { base: 0, sm: 4 },
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
