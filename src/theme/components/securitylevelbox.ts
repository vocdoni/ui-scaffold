import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  border: '2px solid',
  borderColor: 'table.border',
  borderRadius: 'md',
  py: 2,
  px: 4,
  fontWeight: 'bold',
  textAlign: 'center',
  w: 'full',
  color: 'white',
})

const weak = defineStyle(() => ({ bg: 'red.800', borderColor: 'red.600' }))
const mid = defineStyle(() => ({ bg: 'orange.800', borderColor: 'orange.600' }))
const strong = defineStyle(() => ({ bg: 'green.800', borderColor: 'green.600' }))
const inactive = defineStyle(() => ({ bg: 'gray.900' }))

export const SecurityLevelBox = defineStyleConfig({
  baseStyle,
  variants: {
    weak,
    mid,
    strong,
    inactive,
  },
})
