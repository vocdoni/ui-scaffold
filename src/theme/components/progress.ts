import { progressAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(progressAnatomy.keys)

export const Progress = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'black',
    size: 'xs',
  },
})
