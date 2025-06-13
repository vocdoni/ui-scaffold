import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Progress,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuPlus, LuSearch, LuSettings, LuTrash2, LuUsers } from 'react-icons/lu'
import { generatePath, useNavigate, useOutletContext } from 'react-router-dom'
import PaginatedTableFooter from '~components/shared/Pagination/PaginatedTableFooter'
import { Routes } from '~routes'
import { QueryKeys } from '~src/queries/keys'
import { Member, useDeleteMembers, useImportJobProgress, useUrlPagination } from '~src/queries/members'
import { MemberbaseTabsContext } from '..'
import { useTable } from '../TableProvider'
import { ExportMembers } from './Export'
import { ImportMembers } from './Import'
import { MemberManager } from './Manager'

type MemberActionsProps = {
  member: Member
  onDelete: () => void
}

type MemberBulkActionsProps = {
  onDelete: () => void
}

type DeleteMemberModalProps = {
  isOpen: boolean
  onClose: () => void
} & Omit<ModalProps, 'children'>

const MemberActions = ({ member, onDelete }: MemberActionsProps) => {
  const { t } = useTranslation()

  return (
    <Menu placement='bottom-end'>
      <MenuButton as={IconButton} icon={<LuEllipsis />} variant='ghost' size='sm' />
      <MenuList minW='120px'>
        <MemberManager
          member={member}
          control={<MenuItem>{t('members_table.edit', { defaultValue: 'Edit' })}</MenuItem>}
        />
        <MenuDivider />
        <MenuItem color='red.400' onClick={onDelete}>
          {t('members_table.delete', { defaultValue: 'Delete' })}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const ColumnManager = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { columns, setColumns } = useTable()

  const toggleColumn = (columnId: string) => {
    const updatedColumns = columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col))
    setColumns(updatedColumns)
  }

  return (
    <>
      <IconButton
        icon={<LuSettings />}
        aria-label={t('members_table.manage_columns', { defaultValue: 'Manage Columns' })}
        variant='ghost'
        size='sm'
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Heading size='md'>{t('members_table.manage_columns', { defaultValue: 'Manage Columns' })}</Heading>
            <Text fontSize='sm' color='texts.subtle'>
              {t('members_table.manage_columns_description', {
                defaultValue: 'Customize which columns are displayed in the members table.',
              })}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            {columns.map((col) => (
              <Flex key={col.id} justify='space-between' align='center' my={2}>
                <Text>{col.label}</Text>
                <IconButton
                  icon={col.visible ? <LuEyeOff /> : <LuEye />}
                  aria-label={t('members_table.toggle_column', {
                    defaultValue: `Toggle ${col.id} column`,
                  })}
                  onClick={toggleColumn.bind(null, col.id)}
                  variant='ghost'
                />
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const MemberFilters = () => {
  const { t } = useTranslation()
  const { search, setSearch } = useTable()

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Flex gap={2}>
      <InputGroup maxW='300px'>
        <InputLeftElement pointerEvents='none'>
          <Icon as={LuSearch} color='texts.subtle' />
        </InputLeftElement>
        <Input
          placeholder={t('members_table.search', { defaultValue: 'Search members...' })}
          value={search}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Button leftIcon={<Icon as={LuUsers} />} variant='outline' colorScheme='gray' disabled={true}>
        {t('members_table.create_group_all', {
          defaultValue: 'Create a group with all members',
        })}
      </Button>
    </Flex>
  )
}

const MemberBulkActions = ({ onDelete }: MemberBulkActionsProps) => {
  const { t } = useTranslation()
  const { selectedRows } = useTable()

  const createGroup = () => {
    console.log('Creating group with IDs:', selectedRows)
  }

  return (
    <Flex gap={4} align='center' minH='42px'>
      {selectedRows.length > 0 ? (
        <>
          <Text fontSize='sm' color='texts.subtle'>
            <Trans
              i18nKey='members_table.selected'
              count={selectedRows.length}
              components={{ strong: <Text as='span' fontSize='sm' fontWeight='extrabold' display='inline' /> }}
              defaults='Selected: <strong>{{count}} member</strong>'
            />
          </Text>
          <Button
            leftIcon={<Icon as={LuUsers} />}
            variant='outline'
            size='sm'
            colorScheme='gray'
            disabled={true}
            onClick={createGroup}
          >
            {t('members_table.create_group', {
              defaultValue: 'Create a group',
            })}
          </Button>
          <Button leftIcon={<Icon as={LuTrash2} />} size='sm' colorScheme='red' variant='outline' onClick={onDelete}>
            {t('members_table.bulk_delete', { defaultValue: 'Delete' })}
          </Button>
        </>
      ) : (
        <Text fontSize='sm' color='texts.subtle'>
          <Trans i18nKey='members_table.select_hint' defaults='Select members to perform bulk actions' />
        </Text>
      )}
    </Flex>
  )
}

const DeleteMemberModal = ({ isOpen, onClose, ...props }: DeleteMemberModalProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { organization } = useOrganization()
  const deleteMutation = useDeleteMembers()
  const { selectedRows, setSelectedRows } = useTable()
  const queryClient = useQueryClient()
  const { page, limit } = useUrlPagination()
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(selectedRows)
      setSelectedRows([])
      toast({
        title: t('memberbase.delete_member.success', {
          defaultValue: 'Member deleted successfully',
          defaultValue_other: 'Members deleted successfully',
          count: selectedRows.length,
        }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate(generatePath(Routes.dashboard.memberbase.members, { page: 1 }))
      onClose()
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.organization.members(organization?.address), page, limit],
      })
    } catch (error) {
      toast({
        title: t('memberbase.delete_member.error', {
          defaultValue: 'Error deleting member',
          defaultValue_other: 'Error deleting members',
          count: selectedRows.length,
        }),
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex flexDirection='column' gap={2}>
            <Heading fontSize='lg'>{t('memberbase.delete_member.title', { defaultValue: 'Delete Members' })}</Heading>
            <Text fontSize='sm' size='sm' color='texts.subtle'>
              {t('memberbase.delate_member.subtitle', {
                defaultValue: 'Are you sure you want to delete {{count}} member? This action cannot be undone.',
                defaultValue_other: 'Are you sure you want to delete {{count}} members? This action cannot be undone.',
                count: selectedRows.length,
              })}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex justifyContent='flex-end' mt={4} gap={2}>
            <Button variant='outline' onClick={onClose}>
              {t('memberbase.delete_member.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button isLoading={deleteMutation.isPending} colorScheme='red' onClick={handleDelete}>
              {t('memberbase.delete_member.delete', { defaultValue: 'Delete' })}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ImportProgress = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { organization } = useOrganization()
  const { jobID, setJobID } = useOutletContext<MemberbaseTabsContext>()
  const { data, isError } = useImportJobProgress()
  const { page, limit } = useUrlPagination()

  const closeAlert = () => {
    setJobID(null)
  }

  useEffect(() => {
    if (data?.progress === 100) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.organization.members(organization.address), page, limit],
      })
    }
  }, [data?.progress])

  if (!jobID) return null

  if (isError) {
    return (
      <Alert
        status='error'
        borderRadius='md'
        mb={3}
        mt={4}
        p={6}
        as={Flex}
        flexDirection='row'
        justifyContent='space-between'
      >
        <Flex flexDirection='column' gap={2}>
          <AlertTitle>{t('import_progress.error_title', { defaultValue: 'Import Error' })}</AlertTitle>
          <AlertDescription>
            {t('import_progress.error_description', {
              defaultValue: 'An error occurred while importing your member data. Please try again later.',
            })}
          </AlertDescription>
        </Flex>
        <CloseButton alignSelf='flex-start' position='relative' onClick={closeAlert} />
      </Alert>
    )
  }

  const isComplete = data?.progress === 100

  return (
    <Alert
      status={isComplete ? 'success' : 'info'}
      borderRadius='md'
      mb={3}
      mt={4}
      p={6}
      as={Flex}
      flexDirection='row'
      justifyContent='space-between'
    >
      <Flex flexDirection='column' gap={2} flex={1}>
        <AlertTitle>
          {isComplete
            ? t('import_progress.success_title', { defaultValue: 'Import Completed Successfully' })
            : t('import_progress.title', { defaultValue: 'Memberbase Import in Progress' })}
        </AlertTitle>

        <AlertDescription display='flex' flexDirection='column' gap={2}>
          {isComplete ? (
            <>
              <Text>
                {t('import_progress.success_description', {
                  defaultValue: 'Your member data has been imported successfully.',
                })}
              </Text>
              <Text fontSize='sm'>
                {t('import_progress.success_note', {
                  defaultValue: 'You may now start using your imported members.',
                })}
              </Text>
            </>
          ) : (
            <>
              <Progress size='md' value={data?.progress} borderRadius='md' isAnimated />
              <Text>
                {t('import_progress.description', {
                  defaultValue:
                    'Your member data is being imported. This may take a few minutes depending on the size of your file.',
                })}
              </Text>
              <Text fontSize='sm'>
                {t('import_progress.note', {
                  defaultValue: 'You can safely close this page. An email will be sent to you upon completion.',
                })}
              </Text>
            </>
          )}
        </AlertDescription>
      </Flex>
      <CloseButton alignSelf='flex-start' position='relative' onClick={closeAlert} />
    </Alert>
  )
}

const MembersTable = () => {
  const { t } = useTranslation()
  const {
    filteredData,
    isLoading,
    isFetching,
    search,
    setSelectedRows,
    isSelected,
    allVisibleSelected,
    someSelected,
    toggleAll,
    toggleOne,
    columns,
  } = useTable()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const openDeleteModal = (member?) => {
    if (member) setSelectedRows((prev) => [...prev, member.id])
    onOpen()
  }

  const isLoadingOrImporting = isLoading || isFetching
  const isEmpty = filteredData.length === 0 && !isLoadingOrImporting

  return (
    <>
      <ImportProgress />
      <TableContainer border='1px' borderRadius='sm' borderColor='table.border' overflowX='visible' overflowY='visible'>
        <Flex px={4} pt={4}>
          <Flex direction='column' flex={1} gap={2}>
            <MemberFilters />
            <MemberBulkActions onDelete={() => openDeleteModal()} />
          </Flex>
          <Flex gap={2}>
            <ImportMembers />
            <ExportMembers />
            <MemberManager
              control={
                <Button colorScheme='black' leftIcon={<Icon as={LuPlus} />}>
                  {t('memberbase.add_member.button', { defaultValue: 'Add Member' })}
                </Button>
              }
            />
          </Flex>
        </Flex>

        {isLoadingOrImporting ? (
          <Flex justify='center' align='center' height='200px'>
            <Spinner position='absolute' />
          </Flex>
        ) : isEmpty ? (
          <Flex justify='center' align='center' height='200px'>
            <Text color='texts.subtle' fontSize='sm'>
              {search
                ? t('members_table.no_filter_results', {
                    defaultValue: 'No members matching these attributes',
                  })
                : t('members_table.no_results', {
                    defaultValue: 'No members found',
                  })}
            </Text>
          </Flex>
        ) : (
          <>
            <Table>
              <Thead>
                <Tr>
                  <Th width='50px'>
                    <Checkbox
                      isChecked={allVisibleSelected}
                      isIndeterminate={someSelected && !allVisibleSelected}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                  </Th>
                  {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <Th key={col.id}>{col.label}</Th>
                    ))}
                  <Th width='50px'>
                    <ColumnManager />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((member) => (
                  <Tr key={member.id}>
                    <Td>
                      <Checkbox
                        isChecked={isSelected(member.id)}
                        onChange={(e) => toggleOne(member.id, e.target.checked)}
                      />
                    </Td>
                    {columns
                      .filter((column) => column.visible)
                      .map((column) => (
                        <Td key={column.id}>{member[column.id]}</Td>
                      ))}
                    <Td>
                      <MemberActions member={member} onDelete={() => openDeleteModal(member)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Box p={4}>
              <PaginatedTableFooter />
            </Box>
          </>
        )}
      </TableContainer>
      <DeleteMemberModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default MembersTable
