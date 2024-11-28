import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { InfoIcon, WarningIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    display: 'grid',
    gridTemplateColumns: { base: '1fr', lg: 'fit-content(50px) 1fr' },
    border: '1px solid',
    borderColor: 'alert.border',
    borderRadius: 'lg',
    width: 'fit-content',
  },
  title: {
    gridColumn: { lg: 2 },
  },
  description: {
    gridColumn: { lg: 2 },
  },
  icon: {
    gridColumn: 1,
  },
})

export const Alert = defineMultiStyleConfig({ baseStyle })
