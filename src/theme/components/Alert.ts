import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const info = definePartsStyle({
  container: {
    borderRadius: 'md',
    border: '1px solid',
    borderColor: 'alert_info.color',
    bgColor: 'alert_info.bg',
  },

  title: {
    color: 'alert_info.color',
    ml: '20px',

    '& span': {
      display: 'block',
      fontWeight: 700,
    },

    fontWeight: 400,
  },
  icon: {
    color: 'alert_info.color',
  },
})

const variantsAlert = {
  info,
}

export const Alert = defineMultiStyleConfig({ variants: variantsAlert })
