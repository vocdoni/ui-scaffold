import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { ellipsisButtonAnatomy } from '@vocdoni/chakra-components'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(ellipsisButtonAnatomy)

const sizes = {
  xs: definePartsStyle({
    button: { py: 4, px: 3, h: '8', minW: '8', fontSize: 'sm' },
    input: { py: 4, px: 3, h: '8', minW: '8', fontSize: 'sm' },
  }),
}

export const EllipsisButton = defineMultiStyleConfig({
  sizes,
  defaultProps: {
    size: 'xs',
  },
})
