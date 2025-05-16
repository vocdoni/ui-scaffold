import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { paginationAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(paginationAnatomy)

export const Pagination = defineVoteWeightTipStyle({
  baseStyle: defineVoteWeightParts({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    buttonGroup: {
      flexWrap: 'wrap',
      rowGap: '2',
      ml: 'auto',
    },
    totalResults: {},
  }),
})
