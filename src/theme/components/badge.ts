import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    borderColor: `${colorScheme}.200`,
    borderRadius: 'full',
    fontWeight: 'normal',
    textTransform: 'normal',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const sm = defineStyle({
  fontSize: 'sm',
  px: '8px',
  py: '2px',
})

const md = defineStyle({
  fontSize: 'md',
  px: '10px',
  py: '2px',
})

const lg = defineStyle({
  fontSize: 'lg',
  px: '12px',
  py: '4px',
})

export const Badge = defineStyleConfig({ baseStyle, sizes: { sm, md, lg } })
