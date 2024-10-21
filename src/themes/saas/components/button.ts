import { mode } from '@chakra-ui/theme-tools'
import { defineStyleConfig } from '@chakra-ui/styled-system'

const commonStyles = (props: any) => {
  const { colorScheme } = props
  return {
    display: 'flex',
    gap: 3,
    bg: props.colorScheme === 'whiteAlpha' ? 'white' : `${colorScheme}.500`,
    color: props.colorScheme === 'whiteAlpha' ? 'black' : 'white',
    _focus: {
      bg: `${colorScheme}.500`,
    },
    _hover: {
      bg: `${colorScheme}.600`,
    },
    _active: {
      bg: `${colorScheme}.700`,
    },
  }
}

export const Button = defineStyleConfig({
  variants: {
    brand: (props: any) => ({
      ...commonStyles(props),
      borderRadius: 'xl',
    }),
    outline: (props: any) => ({ borderRadius: 'full', bgColor: 'white' }),
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
