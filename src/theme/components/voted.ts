import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { votedAnatomy } from '@vocdoni/chakra-components'
const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(votedAnatomy)

const baseStyle = definePartsStyle({
  link: {
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
  },
})

export const Voted = defineMultiStyleConfig({ baseStyle })
