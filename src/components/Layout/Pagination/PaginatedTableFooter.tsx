import { Box, Text } from '@chakra-ui/react'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { useRoutedPagination } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import RowsPerPageSelect from './RowsPerPageSelect'

const PaginatedTableFooter = () => {
  const { pagination } = useRoutedPagination()

  if (!pagination) return null

  const page = pagination.currentPage + 1
  const total = pagination.lastPage + 1

  return (
    <Box display='flex' flexDirection='row' alignItems='center' gap={5} justifyContent='space-between'>
      <RowsPerPageSelect />
      <Box display='flex' flexDirection='row' alignItems='center' gap={5}>
        <Text size='sm'>
          <Trans i18nKey='pagination.page_out_of' values={{ page, total }}>
            Page {{ page }} of {{ total }}
          </Trans>
        </Text>
        <RoutedPagination
          pagination={pagination}
          size='xs'
          buttonProps={{ size: 'xs', variant: 'ghost', colorScheme: 'gray' }}
        />
      </Box>
    </Box>
  )
}

export default PaginatedTableFooter
