import { confirmAnatomy } from '@vocdoni/chakra-components'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  content: {
    p: 6,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  confirm: {
    bgColor: 'process.identify_button_bg',
    color: 'process.identify_button_color',
  },
  cancel: {
    border: '1px solid red',
    color: 'red',
  },
})

export const ConfirmModal = defineMultiStyleConfig({
  baseStyle,
})
