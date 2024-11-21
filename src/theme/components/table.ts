import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  container: {
    border: '3px solid red',
  },
  table: {
    borderRadius: 'lg',
  },
  thead: {},
  th: {},
  td: {},
}))

const md = definePartsStyle({
  table: {
    maxW: '300px !important',
    overflowX: 'scroll',
    // border: '2px solid red',
  },
  th: {
    paddingY: '24px',
  },
  td: {
    color: 'red',
    whiteSpace: 'nowrap',
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  sizes: { md },
})
