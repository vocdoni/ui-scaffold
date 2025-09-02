import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { confirmAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  header: {
    fontWeight: 'extrabold',
    fontSize: 'lg',
  },

  close: { display: 'none' },

  footer: {
    justifyContent: 'flex-end',
  },

  cancel: {
    border: '1px solid',
    borderColor: 'table.border',
  },

  confirm: {
    bg: 'red.800',
    color: 'white',
    _hover: { bg: 'red.900' },
  },
})

export const ConfirmModal = defineMultiStyleConfig({
  baseStyle,
})
