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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    gap: 2,
    width: { base: '100%', md: '200px', lg: '100%', lg2: '220px', xl: '250px' },
    height: { base: 'auto', md: '150px', lg: 'auto', lg2: '140px', xl: '120px' },
    p: 4,
    px: 6,
    bgColor: 'white',
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'md',
    borderBottom: 'none',
    color: 'process_create.tabs.card.color',

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
      },
    },

    '& > svg:first-of-type': {
      display: 'none',
      position: 'absolute',
      top: 2,
      right: 2,
      color: 'primary.500',
    },

    _selected: {
      boxShadow: 'var(--box-shadow-darker)',
      '& > svg:first-of-type': {
        display: 'block',
      },
      '& > div > p': {
        color: 'process_create.tabs.card.selected_color',
      },
    },
  },
})
const process = definePartsStyle({
  root: {},
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
