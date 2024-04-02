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

    '& > span': {
      whiteSpace: 'nowrap',
    },

    _checked: {
      '& > div:first-of-type': {
        border: 'none',
        '& svg': {
          display: 'block',
          color: 'home.demo.radio',
          size: 25,
        },
      },
    },

    _hover: {
      boxShadow: 'var(--box-shadow-darker)',
    },
  },
})

// export the component theme
export const Radio = defineMultiStyleConfig({
  variants: { demo },
})
