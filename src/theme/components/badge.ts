import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    borderColor: `${colorScheme}.200`,
    borderRadius: 'full',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    bgColor: `${colorScheme}.500`,
    color: 'white',
    _dark: {
      bgColor: `${colorScheme}.200`,
      color: 'black',
    },
  }
})

const xs = defineStyle({
  fontSize: '12px',
  lineHeight: '12px',
  px: '4px',
  py: '3px',
})

const sm = defineStyle({
  fontSize: 'sm',
  lineHeight: '14px',
  px: '8px',
  py: '2px',
})

const md = defineStyle({
  fontSize: 'md',
  lineHeight: '16px',
  px: '10px',
  py: '2px',
})

const lg = defineStyle({
  fontSize: 'lg',
  lineHeight: '18px',
  px: '12px',
  py: '4px',
})

export const Badge = defineStyleConfig({ baseStyle, sizes: { sm, md, lg, xs }, defaultProps: { size: 'xs' } })
