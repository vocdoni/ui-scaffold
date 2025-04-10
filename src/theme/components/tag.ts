import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme } = props

  return {
    container: {
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 'xs',
      fontWeight: 500,
      py: 0.5,
      px: 1.5,
      color: colorScheme === 'gray' ? 'gray' : 'black',
    },
  }
})

export const Tag = defineMultiStyleConfig({
  baseStyle,
  defaultProps: { colorScheme: 'brand' },
})
