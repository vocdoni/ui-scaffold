import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { ellipsisButtonAnatomy } from '@vocdoni/chakra-components'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(ellipsisButtonAnatomy)

const sharedButtonInputStyle = { py: 4, px: 3, h: '8', minW: '8', fontSize: 'sm' }
const sizes = {
  xs: definePartsStyle({
    button: sharedButtonInputStyle,
    input: sharedButtonInputStyle,
  }),
}

export const EllipsisButton = defineMultiStyleConfig({
  sizes,
  defaultProps: {
    size: 'xs',
  },
})
