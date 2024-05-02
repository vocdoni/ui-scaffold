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
    bgColor: 'white',
    boxShadow: 'var(--box-shadow)',
    borderBottom: 'none',
    color: 'process_create.description',
    borderRadius: 0,

    '& #description': {
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

    '& #title': {
      display: 'flex',
      alignItems: 'center',
      w: 'full',
      gap: 3,
      fontSize: 'sm',

      '& p': {
        fontWeight: 'bold',
        textAlign: 'start',
        fontFamily: 'pixeloidsans',
        textTransform: 'uppercase',
      },
    },

    '& #empty-check': {
      display: 'none',
    },

    '& > img': {
      w: 5,
      h: 5,
      bgColor: 'checkbox.selected',
      p: 1,
      position: 'absolute',
      top: 2,
      right: 2,
      display: 'none',
    },

    _selected: {
      boxShadow: 'var(--box-shadow-darker)',
      '& > img': {
        display: 'block',
      },
      '& > div > p': {
        color: 'process_create.tabs_selected_color',
      },
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
    fontSize: 'lg',

    _hover: {
      bgColor: 'process.tabs.hover',
    },
    _active: {
      bgColor: 'process.tabs.active_bg',
    },
    _selected: {
      fontWeight: 'bold',
      borderBottom: '2px solid',
      color: 'process.tabs.selected_color',
    },
  },
  tablist: {
    width: '90%',
    mx: 'auto',
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
