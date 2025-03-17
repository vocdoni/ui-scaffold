import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)
const { definePartsStyle: defineDetailedPartsStyle, defineMultiStyleConfig: defineDetailedMultiStyleConfig } =
  createMultiStyleConfigHelpers(['icon', 'circle', 'checkbox', 'title', 'badge', 'description', 'checkbox'])

export const DetailedCheckbox = defineDetailedMultiStyleConfig({
  baseStyle: defineDetailedPartsStyle((props) => ({
    circle: {
      position: 'absolute',
      top: '18px',
      right: '18px',
      w: 4,
      h: 4,
      borderRadius: 'full',
      border: `1px solid`,
      borderColor: 'tab_card.checkbox_border',
    },
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
      color: 'text_secondary.light',
      _dark: { color: 'text_secondary.dark' },
    },
  })),
})

export const Checkbox = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'brand',
  },
  baseStyle: {
    control: {
      borderRadius: 'full',
    },
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
        borderColor: 'checkbox_detailed_border.light',
        borderRadius: 'lg',

        _dark: {
          borderColor: 'checkbox_detailed_border.dark',
        },
      }),
      control: defineStyle({
        position: 'absolute',
        right: '1rem',
        top: '1rem',
        borderRadius: 'full',
      }),
      label: defineStyle({
        fontSize: 'sm',
        alignSelf: 'start',
      }),
    }),
  },
})
