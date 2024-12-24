import { Box } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

export const NoResultsFiltering = () => {
  return (
    <Box>
      <Trans i18nKey='no_results_filtering'>Your current search filter returns no results</Trans>
    </Box>
  )
}
