import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

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

    _dark: {
      bgColor: 'table.thead.bg_dark',
    },
  },
}))

const md = definePartsStyle({
  table: {
    borderRadius: 'xl',
  },
  thead: {},
  tbody: {},
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
  tr: {
    borderBottom: '2px solid',
    borderColor: 'table.border_color.light',

    _dark: {
      borderColor: 'table.border_color.dark',
    },
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  sizes: { md },
})
