import { createMultiStyleConfigHelpers, defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { PaginationAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(PaginationAnatomy)

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

const pageButtonBaseStyle = {
  bgColor: 'transparent !important',
  color: 'black',
  borderColor: 'black',

  _hover: {
    color: 'black',
    bgColor: 'page_button.light !important',
  },

  _dark: {
    color: 'white',
    borderColor: 'white',

    _hover: {
      bgColor: 'page_button.dark !important',
    },
  },
}

export const PageButton = defineStyleConfig({
  baseStyle: pageButtonBaseStyle,
})
