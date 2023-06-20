import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const link = {
  color: 'link',
  textDecoration: 'underline',

  _hover: {
    textDecoration: 'none',
  },
}
const ghost = {
  _hover: {
    color: 'buttons.ghost_hover_color',
  },
}
const vcd_green = {
  colorScheme: 'process_create.btn_vcd',

  _hover: {
    fontSize: 'lg',
  },
  _active: {
    fontSize: 'md',
  },
}

const prev = defineStyle({
  bg: 'process_create.prev_step.bg',
  borderRadius: 'md',
  boxShadow: '0px 2px 4px gray',
  width: 36,
  fontWeight: 600,
  fontSize: 'md',
  color: 'process_create.prev_step.color',

  _hover: {
    bg: 'process_create.prev_step.bg',
    fontSize: 'lg',
  },
  _active: {
    bg: 'process_create.prev_step.bg',
    fontSize: 'md',
  },
})

const next = defineStyle({
  bg: 'process_create.next_step.bg',
  ml: 'auto',
  borderRadius: 'md',
  boxShadow: '0px 2px 4px gray',
  width: 36,
  fontWeight: 600,
  fontSize: 'md',
  color: 'process_create.next_step.color',

  _hover: {
    bg: 'process_create.next_step.bg',
    fontSize: 'lg',
  },
  _active: {
    bg: 'process_create.next_step.bg',
    fontSize: 'md',
  },
})

export const Button = defineStyleConfig({
  variants: { prev, next, vcd_green, ghost, link },
})
