import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { alpha } from '~utils/chakra'

const baseStyle = defineStyle((props) => ({
  border: '1px solid',
  borderColor: alpha(`${props.colorScheme}.200`, 0.6),
  textTransform: 'normal',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
  bg: alpha(`${props.colorScheme}.100`, 0.2),
  '& svg': {
    boxSize: 3.5,
  },
}))

const xs = defineStyle({
  fontSize: 'xs',
  lineHeight: 'xs',
  px: 1,
  py: '3px',
})

const sm = defineStyle({
  fontSize: 'sm',
  lineHeight: 'sm',
  px: 2,
  py: 1,
})

const md = defineStyle({
  fontSize: 'md',
  lineHeight: 'md',
  px: 3,
  py: 2,
})

const lg = defineStyle({
  fontSize: 'lg',
  lineHeight: 'lg',
  px: 3,
  py: 2,
})

export const Badge = defineStyleConfig({
  baseStyle,
  sizes: { xs, sm, md, lg },
  defaultProps: { size: 'xs' },
})
