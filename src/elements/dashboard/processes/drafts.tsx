import {
  Box,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { LuCopy, LuEllipsisVertical, LuPencil, LuTrash } from 'react-icons/lu'
import { createSearchParams, generatePath, Link as RouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import RoutedPaginatedTableFooter from '~components/shared/Pagination/PaginatedTableFooter'
import { useUrlPagination } from '~queries/members'
import { Routes } from '~routes'

const useDrafts = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const { page } = useUrlPagination()

  const baseUrl = ApiEndpoints.OrganizationDrafts.replace('{address}', organization?.address)
  const fetchUrl = `${baseUrl}?page=${page}`

  return useQuery({
    queryKey: ['organization', organization?.address, 'drafts'],
    enabled: !!organization?.address,
    queryFn: () => bearedFetch<any>(fetchUrl),
    select: (data) => {
      const currentPage = data.currentPage
      const lastPage = data.totalPages

      return {
        processes: data.processes,
        pagination: {
          totalItems: data.processes.length,
          currentPage,
          lastPage,
          previousPage: currentPage > 1 ? currentPage - 1 : null,
          nextPage: currentPage < lastPage ? currentPage + 1 : null,
        },
      }
    },
  })
}

const DraftsTable = (props) => {
  const { t } = useTranslation()
  const drafts = [
    { id: 'draft1', title: 'Draft Election 1', startDate: '2024-07-01', endDate: '2024-07-10', type: 'Single Choice' },
    {
      id: 'draft2',
      title: 'Draft Election 2',
      startDate: '2024-08-01',
      endDate: '2024-08-10',
      type: 'Multiple Choice',
    },
  ]

  return (
    <Box border='1px solid' borderColor='table.border' borderRadius='sm' w='full'>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>{t('process_list.title', { defaultValue: 'Title' })}</Th>
              <Th>{t('process_list.start_date', { defaultValue: 'Start date' })}</Th>
              <Th>{t('process_list.end_date', { defaultValue: 'End date' })}</Th>
              <Th>{t('process_list.type', { defaultValue: 'Type' })}</Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drafts.map((draft) => (
              <DraftsRow key={draft.id} draft={draft} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box p={4}>
        <RoutedPaginatedTableFooter />
      </Box>
    </Box>
  )
}

const DraftsRow = ({ draft }) => {
  return (
    <Tr key={draft.id} position='relative'>
      <Td>
        <Link
          as={RouterLink}
          to={{
            pathname: generatePath(Routes.processes.create),
            search: createSearchParams({ draft: draft.id }).toString(),
          }}
          _hover={{ textDecoration: 'underline' }}
          fontWeight='medium'
        >
          {draft.title}
        </Link>
      </Td>
      <Td>{draft.startDate}</Td>
      <Td>{draft.endDate}</Td>
      <Td>{draft.type}</Td>
      <Td isNumeric>
        <DraftsContextMenu draftId={draft.id} />
      </Td>
    </Tr>
  )
}

const DraftsContextMenu = ({ draftId }) => {
  const { t } = useTranslation()
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<Icon as={LuEllipsisVertical} />} variant='ghost' size='sm' />
      <Portal>
        <MenuList>
          <MenuItem
            as={RouterLink}
            to={{
              pathname: generatePath(Routes.processes.create),
              search: createSearchParams({ draft: draftId }).toString(),
            }}
            icon={<Icon as={LuPencil} boxSize={4} />}
          >
            {t('drafts.edit', { defaultValue: 'Edit Draft' })}
          </MenuItem>
          <MenuItem onClick={() => console.log('delete')} icon={<Icon as={LuCopy} boxSize={4} />}>
            {t('drafts.clone', { defaultValue: 'Clone Draft' })}
          </MenuItem>
          <MenuDivider />
          <MenuItem color='red.400' onClick={() => console.log('delete')} icon={<Icon as={LuTrash} boxSize={4} />}>
            {t('drafts.delete', { defaultValue: 'Delete Draft' })}
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

const Drafts = (props) => {
  const { data, isLoading } = useDrafts()

  const pagination = data?.pagination || {
    totalItems: 0,
    currentPage: 0,
    lastPage: 0,
    previousPage: null,
    nextPage: null,
  }

  if (isLoading) return <Progress size='xs' isIndeterminate colorScheme='gray' />

  return (
    <RoutedPaginationProvider path={Routes.dashboard.processes.drafts} pagination={pagination}>
      <DraftsTable {...props} />
    </RoutedPaginationProvider>
  )
}

export default Drafts
