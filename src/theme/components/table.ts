import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  table: {
    borderRadius: 'lg',
    bgColor: 'white',
    overflow: 'hidden',
  },
  thead: {
    bg: 'gray.100',
    bgColor: 'lightBlue',
  },
  th: {
    textTransform: 'normal',
    fontWeight: 600,
    'padding-top': '160px !important',
    textAlign: 'left',
  },
  td: {},
}))

export const Table = defineMultiStyleConfig({
  baseStyle,
})
