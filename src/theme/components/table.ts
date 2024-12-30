import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  table: {
    overflow: 'hidden',
    bgColor: 'table.bg.light',

    _dark: {
      bgColor: 'table.bg.dark',
    },
  },
  thead: {
    bgColor: 'table.thead.bg_light',
    borderBottom: '1.5px solid',
    borderColor: 'table.border_color.light',

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
  tbody: {
    '& tr:last-of-type': {
      borderColor: 'transparent',
    },
  },
  tr: {
    position: 'relative',
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
})
