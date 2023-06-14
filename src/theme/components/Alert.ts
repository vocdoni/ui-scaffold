import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const info = definePartsStyle({
  container: {
    border: '1px solid',
    borderColor: 'alert_info.color',
    bgColor: 'alert_info.bg',
  },

  title: {
    color: 'alert_info.color',
    ml: '20px',

    '& p:nth-of-type(1)': {
      fontWeight: 700,
    },

    '& p:nth-of-type(2)': {
      fontWeight: 400,
    },
  },
  icon: {
    color: 'alert_info.color',
  },
})

const variantsAlert = {
  info,
}

export const Alert = defineMultiStyleConfig({ variants: variantsAlert })
