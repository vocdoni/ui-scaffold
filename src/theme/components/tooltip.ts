import { defineStyleConfig } from '@chakra-ui/react'

const baseStyle = {
  boxShadow: '0 1px 2px 0 rgb(0 0 0/0.05)',
  border: '1px solid rgb(228, 228, 231)',
  px: 2,
  py: 1,
  bgColor: 'white',
  color: 'black',
}

export const Tooltip = defineStyleConfig({ baseStyle })
