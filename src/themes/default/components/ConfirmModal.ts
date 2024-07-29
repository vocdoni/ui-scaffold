import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { confirmAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  cancel: {
    display: 'none',
  },
  footer: {
    justifyContent: 'center',
  },
})

export const ConfirmModal = defineMultiStyleConfig({
  baseStyle,
})
