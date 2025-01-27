import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { spreadsheetAccessAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  button: {
    w: 'full',
    color: 'red',
  },
  //   disconnect: {
  //     color: 'red',
  //   },
})

export const SpreadsheetAccess = defineMultiStyleConfig({
  baseStyle,
})
