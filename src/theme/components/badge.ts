import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle((props) => {
  const { colorScheme } = props

  return {
    border: '1px solid',
    borderColor: `${colorScheme}.200`,
    borderRadius: 'full',
    width: 'fit-content',
    fontWeight: 'normal',
    textTransform: 'normal',
    px: '10px',
    py: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const sm = defineStyle({
  fontSize: 'sm',
})

const md = defineStyle({
  fontSize: 'md',
})

const lg = defineStyle({
  fontSize: 'lg',
})

export const Badge = defineStyleConfig({ baseStyle, sizes: { sm, md, lg } })
