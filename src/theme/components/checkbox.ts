import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)
const { definePartsStyle: defineDetailedPartsStyle, defineMultiStyleConfig: defineDetailedMultiStyleConfig } =
  createMultiStyleConfigHelpers(['icon', 'title', 'badge', 'description', 'checkbox'])

export const DetailedCheckbox = defineDetailedMultiStyleConfig({
  baseStyle: defineDetailedPartsStyle((props) => ({
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontWeight: 'bold',
      fontSize: 'sm',
    },
    badge: {
      position: 'absolute',
      top: '.9rem',
      right: '.9rem',
    },
    description: {
      textAlign: 'start',
      fontSize: 'sm',
    },
  })),
})

export const Checkbox = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'brand',
  },
  variants: {
    detailed: definePartsStyle({
      container: defineStyle({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        border: '1px solid',
        borderColor: 'checkbox.detailed.border',
        borderRadius: 'lg',
        bgColor: 'checkbox.detailed.bg.light',

        _dark: {
          bgColor: 'checkbox.detailed.bg.light',
        },

        _hover: {
          boxShadow: 'none',
        },
      }),
      control: defineStyle({
        position: 'absolute',
        right: '1rem',
        top: '1rem',
      }),
      label: defineStyle({
        fontSize: 'sm',
        alignSelf: 'start',
      }),
    }),
  },
})
