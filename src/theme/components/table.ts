import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const striped = definePartsStyle((props) => ({
  table: {
    borderBottom: 'none',
    overflow: 'hidden',
    bgColor: 'table.bg.light',

    _dark: {
      bgColor: 'table.bg.dark',
    },
  },

  thead: {
    bgColor: 'table.thead.bg_light',

    tr: {
      th: {
        borderBottomColor: 'table.variant.striped.light.border',

        _dark: {
          borderBottomColor: 'table.variant.striped.dark.border',
        },
      },
    },
    th: {
      textTransform: 'initial',
    },

    _dark: {
      bgColor: 'table.thead.bg_dark',
      borderColor: 'table.border_color.dark',
    },
  },

  tbody: {
    'tr:nth-of-type(2n+1) td': {
      bgColor: 'table.variant.striped.light.tr_odd',
      _dark: {
        bgColor: 'table.variant.striped.dark.tr_odd',
      },
    },
    'tr:nth-of-type(2n) td': {
      bgColor: 'table.variant.striped.light.tr_even',
      _dark: {
        bgColor: 'table.variant.striped.dark.tr_even',
      },
    },

    tr: {
      _hover: {
        '& > td': {
          bgColor: 'table.variant.striped.light.hover !important',

          _dark: {
            bgColor: 'table.variant.striped.dark.hover !important',
          },
        },
      },
    },
  },

  td: {
    fontWeight: 'normal',
    borderBottom: 'none',
  },
}))

const simple = definePartsStyle((props) => ({
  table: {
    overflow: 'auto',
  },
  thead: {
    th: {
      px: 4,
      fontWeight: '500',
      '&[data-is-numeric=true]': {
        textAlign: 'right',
      },
      textTransform: 'none',
    },
  },
  tr: {
    ['td,th']: {
      borderBottom: '1px solid #e5e5e5',
    },
  },
  tbody: {
    tr: {
      _hover: {
        bgColor: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    },
  },
  td: {
    fontSize: '14px',
    px: 4,
    '&[data-is-numeric=true]': {
      textAlign: 'right',
    },
  },
}))

export const Table = defineMultiStyleConfig({
  variants: {
    striped,
    simple,
  },
})
