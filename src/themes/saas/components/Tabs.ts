import { mode } from '@chakra-ui/theme-tools'
import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const card = definePartsStyle((props) => ({
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
    bgColor: mode('bg.secondary.light', 'bg.secondary.dark')(props),
    borderBottom: 'none',
    color: mode('navy.700', 'white')(props),
    borderRadius: 'xl',
    w: 'full',

    '& > #description': {
      color: 'text.secondary',
      textAlign: 'start',
      fontSize: 'xs',
    },

    '& #pro-badge': {
      bgColor: 'text.brand',
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
      color: mode('text.light', 'text.dark')(props),

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
      borderColor: 'text.secondary',
    },

    '& > svg': {
      w: 5,
      h: 5,
      color: 'text.brand',
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
}))

const variants = {
  card,
}

export const Tabs = defineMultiStyleConfig({ variants })
