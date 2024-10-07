import { mode } from '@chakra-ui/theme-tools'
import { defineStyleConfig } from '@chakra-ui/styled-system'

const commonStyles = (props: any) => ({
  display: 'flex',
  gap: 3,
  bg:
    props.colorScheme === 'whiteAlpha' ? 'white' : mode(`${props.colorScheme}.500`, `${props.colorScheme}.500`)(props),
  color: props.colorScheme === 'whiteAlpha' ? 'black' : 'white',
  _focus: {
    bg: mode(`${props.colorScheme}.500`, `${props.colorScheme}.500`)(props),
  },
  _active: {
    bg: mode(`${props.colorScheme}.700`, `${props.colorScheme}.700`)(props),
  },
  _hover: {
    bg: mode(`${props.colorScheme}.600`, `${props.colorScheme}.600`)(props),
  },
})

export const Button = defineStyleConfig({
  variants: {
    brand: (props: any) => ({
      ...commonStyles(props),
      borderRadius: 'xl',
    }),
    outline: (props: any) => ({
      ...commonStyles(props),
      borderRadius: 'full',
      borderColor: 'text.brand',
      color: 'text.brand',
      bgColor: 'white',
    }),
    rounded: (props: any) => ({
      ...commonStyles(props),
      borderRadius: 'full',
    }),
  },
  defaultProps: {
    colorScheme: 'brand',
    variant: 'brand',
  },
})
