import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  // button group
  group: {
    gap: 3,
  },

  buttons: {
    border: '3px solid !important',
    borderRadius: '50% !important',

    '&:disabled': {
      borderWidth: '5px !important',
      backgroundColor: '#000 !important',
      backgroundClip: ' padding-bo !importantx',
      border: 'solid 5px transparent !important',
      borderRadius: '50 !important%',

      '&:before': {
        content: `''`,
        position: 'absolute !important',
        top: '0 !important',
        right: '0 !important',
        bottom: '0 !important',
        left: '0 !important',
        zIndex: '-1 !important',
        margin: '-5px !important',
        borderRadius: 'inherit !important',
        background: 'var(--vcd-gradient-brand) !important ',
      },
    },
  },
  // icons used in buttons
  icons: {
    color: 'black !important',
  },
})

export const ElectionActions = defineMultiStyleConfig({
  baseStyle,
})
