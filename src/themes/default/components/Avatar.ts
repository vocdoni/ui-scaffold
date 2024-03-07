import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style

  container: {
    borderRadius: 'full',
    bg: 'avatar.bg',
    color: 'avatar.color',
  },
})

export const Avatar = defineMultiStyleConfig({ baseStyle })
