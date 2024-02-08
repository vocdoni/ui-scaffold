import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

// define custom variant
const demo = definePartsStyle({
  control: {
    display: 'none',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 3,
    py: 5,
    bgColor: 'white',
    w: 'full',
    borderRadius: 'md',
    fontWeight: 'bold',
    boxShadow: 'rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px',

    '& > div:first-of-type': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid gray',
      borderRadius: 'full',
      width: '25px',
      height: '25px',

      '& svg': {
        display: 'none',
      },
    },

    _checked: {
      '& > div:first-of-type': {
        border: 'none',
        '& svg': {
          display: 'block',
          color: '#175CFF',
          size: 25,
        },
      },
    },
  },
})

// export the component theme
export const Radio = defineMultiStyleConfig({
  variants: { demo },
})
