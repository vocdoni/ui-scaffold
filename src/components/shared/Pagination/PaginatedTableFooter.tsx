import { Box, Text } from '@chakra-ui/react'
import { Pagination, RoutedPagination } from '@vocdoni/chakra-components'
import { usePagination, useRoutedPagination } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import RowsPerPageSelect from './RowsPerPageSelect'

const RoutedPaginatedTableFooter = () => {
  const { pagination, initialPage } = useRoutedPagination()

  if (!pagination) return null

  const page = initialPage === 0 ? pagination.currentPage + 1 : pagination.currentPage
  const total = initialPage === 0 ? pagination.lastPage + 1 : pagination.lastPage

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
          buttonProps={{ size: 'xs', colorScheme: 'gray', variant: 'outline' }}
        />
      </Box>
    </Box>
  )
}

export const PaginatedTableFooter = () => {
  const { pagination, initialPage } = usePagination()

  if (!pagination) return null

  const page = initialPage === 0 ? pagination.currentPage + 1 : pagination.currentPage
  const total = initialPage === 0 ? pagination.lastPage + 1 : pagination.lastPage

  return (
    <Box display='flex' flexDirection='row' alignItems='center' gap={5} justifyContent='space-between'>
      <Box display='flex' flexDirection='row' alignItems='center' gap={5}>
        <Text size='sm'>
          <Trans i18nKey='pagination.page_out_of' values={{ page, total }}>
            Page {{ page }} of {{ total }}
          </Trans>
        </Text>
        <Pagination pagination={pagination} buttonProps={{ size: 'xs', colorScheme: 'gray', variant: 'outline' }} />
      </Box>
    </Box>
  )
}

export default RoutedPaginatedTableFooter
