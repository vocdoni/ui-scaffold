import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionTypeBadgeAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionTypeBadgeAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 'lg',
    border: '2px solid',
    borderColor: 'primary.main',
    px: '6',
    py: '2',
    maxW: 'fit-content',
    color: 'primary.main',
    bgColor: 'gray.100',
  },
})

export const QuestionsTypeBadge = defineMultiStyleConfig({
  baseStyle,
})
