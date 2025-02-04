import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  border: '1px solid',
  borderColor: '#999',
  borderRadius: 'full',
  fontWeight: 'normal',
  p: '8px 20px',
  textTransform: 'capitalize',
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
