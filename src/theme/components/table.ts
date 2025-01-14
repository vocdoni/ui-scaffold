import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  table: {
    overflow: 'hidden',
    bgColor: 'table.bg.light',
    border: '2px solid red',

    _dark: {
      bgColor: 'table.bg.dark',
    },
  },
  thead: {
    bgColor: 'table.thead.bg_light',

    tr: {
      th: {
        borderBottomColor: 'var(--chakra-colors-table-variant-striped-light-border)',

        _dark: {
          borderBottomColor: 'var(--chakra-colors-table-variant-striped-dark-border)',
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
  td: {
    fontWeight: 'normal',
    borderBottom: 'none',
  },

  tr: {
    position: 'relative',
  },
}))

const striped = definePartsStyle((props) => ({
  table: {
    borderBottom: 'none',
  },

  tbody: {
    'tr:nth-of-type(2n+1) td': {
      bgColor: 'table.variant.striped.light.tr_odd',
      _dark: {
        bgColor: 'table.variant.striped.dark.tr_odd',
      },
      // borderBottomColor: 'var(--chakra-colors-table-variant-striped-light-border)',
      // bgColor: 'table.variant.striped.light.tr_odd',
      // _dark: {
      //   borderBottomColor: 'var(--chakra-colors-table-variant-striped-dark-border)',
      //   bgColor: 'table.variant.striped.dark.tr_odd',
      // },
      // _hover: {
      //   bgColor: 'table.bg.striped.light.tr_odd',
      // },
    },
    'tr:nth-of-type(2n) td': {
      bgColor: 'table.variant.striped.light.tr_even',
      _dark: {
        bgColor: 'table.variant.striped.dark.tr_even',
      },
      // borderBottomColor: 'var(--chakra-colors-table-variant-striped-light-border)',
      // _dark: {
      //   borderBottomColor: 'var(--chakra-colors-table-variant-striped-dark-border)',
      // },
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
}))

const md = definePartsStyle({
  table: {
    borderRadius: 'lg',
    border: 'none',
  },

  tfoot: {
    td: {
      paddingTop: 3,
      paddingBottom: 4,
      '& > div': {
        alignItems: 'end',
      },
    },
  },
  td: {
    paddingY: 4,
    whiteSpace: 'nowrap',
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  sizes: { md },
  variants: {
    striped,
  },
})
