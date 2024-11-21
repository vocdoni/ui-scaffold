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
    textAlign: 'left',
  },
  td: {},
}))

const md = definePartsStyle({
  th: {
    paddingTop: '160px',
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  sizes: { md },
})
