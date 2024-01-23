import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import checkIcon from '/assets/check-icon.svg'
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: { base: 'column', md: 'row' },
    mb: 10,
    gap: { base: 5, xl: 0 },
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

    '& > p:nth-of-type(1)': {
      color: 'process_create.description',
      textAlign: 'start',
      fontSize: 'xs',
    },

    '& > div': {
      display: 'flex',
      alignItems: 'center',
      w: 'full',
      gap: 3,

      '& p': {
        fontWeight: 'bold',
        textAlign: 'start',
        fontFamily: 'pixeloidsans',
        textTransform: 'uppercase',
      },
    },

    '& > img': {
      w: 5,
      h: 5,
      bgColor: 'checkbox',
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
