import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react'
import { paginationAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(paginationAnatomy)

export const Pagination = defineVoteWeightTipStyle({
  baseStyle: defineVoteWeightParts({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'end',
    },
    totalResults: {
      display: 'none',
    },
  }),
})

export const PaginationButton = defineStyleConfig({})
