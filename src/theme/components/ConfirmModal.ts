import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { confirmAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  content: {
    px: 12,
    py: 4,
  },

  header: {
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'center',
  },
  confirm: {
    bgColor: 'process.confirm_vote.bg',
    color: 'process.confirm_vote.color',
    borderRadius: 'full',
    px: 16,
    _hover: {
      bgColor: 'process.confirm_vote.hover',
    },
    _active: {
      bgColor: 'process.confirm_vote.active',
    },
  },
  cancel: {
    display: 'none',
  },
})

export const ConfirmModal = defineMultiStyleConfig({
  baseStyle,
})
