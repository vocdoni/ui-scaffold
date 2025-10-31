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
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RoutedPaginationProvider, useClient, useOrganization } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { LuCopy, LuEllipsisVertical, LuPencil, LuTrash } from 'react-icons/lu'
import { createSearchParams, generatePath, Link as RouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useCreateProcess } from '~components/Process/Create'
import RoutedPaginatedTableFooter from '~components/shared/Pagination/PaginatedTableFooter'
import { QueryKeys } from '~queries/keys'
import { useUrlPagination } from '~queries/members'
import { Routes } from '~routes'

const useDrafts = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const { page } = useUrlPagination()

  const baseUrl = ApiEndpoints.OrganizationDrafts.replace('{address}', organization?.address)
  const fetchUrl = `${baseUrl}?page=${page}`

  return useQuery({
    queryKey: [...QueryKeys.organization.drafts(organization?.address), page],
    enabled: !!organization?.address,
    queryFn: () => bearedFetch<any>(fetchUrl),
    select: (data) => {
      return {
        ...data,
        pagination: {
          ...data.pagination,
          currentPage: data.pagination.currentPage - 1,
        },
      }
    },
  })
}

const useDeleteDraft = () => {
  const { t } = useTranslation()
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: QueryKeys.organization.drafts(organization?.address),
    mutationFn: (draftId: string) => {
      const deleteUrl = ApiEndpoints.OrganizationProcess.replace('{processId}', draftId)
      return bearedFetch<void>(deleteUrl, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      toast({
        title: t('drafts.deleted_draft', {
          defaultValue: 'Draft deleted successfully',
        }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      queryClient.invalidateQueries({
        queryKey: QueryKeys.organization.drafts(organization?.address),
        exact: false,
      })
    },
  })
}

const DraftsTable = ({ drafts }) => {
  const { t } = useTranslation()

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
          {draft.metadata?.title}
        </Link>
      </Td>
      <Td>{draft.metadata?.startDate}</Td>
      <Td>{draft.metadata?.endDate}</Td>
      <Td>{draft.metadata?.questionType}</Td>
      <Td isNumeric>
        <DraftsContextMenu draft={draft} />
      </Td>
    </Tr>
  )
}

const DraftsContextMenu = ({ draft }) => {
  const { t } = useTranslation()
  const deleteDraftMutation = useDeleteDraft()
  const createProcess = useCreateProcess()
  const { account } = useClient()

  const cloneDraft = () => {
    createProcess.mutate({
      metadata: draft.metadata,
      orgAddress: ensure0x(account?.address),
    })
  }

  const deleteDraft = () => {
    deleteDraftMutation.mutate(draft.id)
  }

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<Icon as={LuEllipsisVertical} />} variant='ghost' size='sm' />
      <Portal>
        <MenuList>
          <MenuItem
            as={RouterLink}
            to={{
              pathname: generatePath(Routes.processes.create),
              search: createSearchParams({ draft: draft.id }).toString(),
            }}
            icon={<Icon as={LuPencil} boxSize={4} />}
          >
            {t('drafts.edit', { defaultValue: 'Edit Draft' })}
          </MenuItem>
          <MenuItem onClick={cloneDraft} icon={<Icon as={LuCopy} boxSize={4} />}>
            {t('drafts.clone', { defaultValue: 'Clone Draft' })}
          </MenuItem>
          <MenuDivider />
          <MenuItem color='red.400' onClick={deleteDraft} icon={<Icon as={LuTrash} boxSize={4} />}>
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
      <DraftsTable drafts={data.processes ?? []} {...props} />
    </RoutedPaginationProvider>
  )
}

export default Drafts
