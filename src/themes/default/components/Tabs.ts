import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle({
  tablist: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: { base: 'unset', md: 'wrap' },
    flexDirection: { base: 'column', md: 'row' },
    mb: 10,
    gap: { base: 5 },
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

    '& > span': {
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

    '& > div:nth-of-type(1)': {
      display: 'flex',
      alignItems: 'center',
      w: 'full',
      gap: 3,

      '& p': {
        fontWeight: 'bold',
        textAlign: 'start',
      },
    },

    '& > div:nth-of-type(2)': {
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
      color: 'checkbox',
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
      '& > div > p': {
        color: 'process_create.tabs_selected_color',
      },
      '& > div:nth-of-type(2)': {
        display: 'none',
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
