import {
  Box,
  Button,
  Checkbox,
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
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  ModalProps,
  Progress,
  Switch,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuPlus, LuSearch, LuSettings, LuTrash2, LuUsers, LuX } from 'react-icons/lu'
import { generatePath, useNavigate, useOutletContext } from 'react-router-dom'
import InputBasic from '~components/shared/Form/InputBasic'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import RoutedPaginatedTableFooter from '~components/shared/Pagination/PaginatedTableFooter'
import { Routes } from '~routes'
import { useCreateGroup } from '~src/queries/groups'
import { QueryKeys } from '~src/queries/keys'
import { Member, useDeleteMembers, usePaginatedMembers } from '~src/queries/members'
import { MemberbaseTabsContext } from '..'
import { useTable } from '../TableProvider'
import { ExportMembers } from './Export'
import { ImportMembers, ImportProgress } from './Import'
import { MemberManager } from './Manager'

enum DeleteModes {
  SELECTED = 'selected',
  ALL = 'all',
}

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
  mode: DeleteModes
} & Omit<ModalProps, 'children'>

type CreateGroupButtonProps = {
  members?: Member[]
}

const maskedFields = new Set<string>(['phone'])

export const maskIfNeeded = (fieldId: string, value: string): string => {
  if (!maskedFields.has(fieldId)) return value
  if (!value) return ''
  return '*********'
}

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
                <Switch
                  colorScheme='black'
                  isChecked={col.visible}
                  onChange={toggleColumn.bind(null, col.id)}
                  aria-label={t('members_table.toggle_column', {
                    defaultValue: `Toggle ${col.id} column`,
                  })}
                />
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const MemberFilters = ({ onDelete }) => {
  const { t } = useTranslation()
  const { search, setSearch, submitSearch } = useOutletContext<MemberbaseTabsContext>()
  const { data } = usePaginatedMembers({ showAll: true })

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitSearch()
  }

  return (
    <Flex gap={2}>
      <InputGroup maxW='300px' as='form' onSubmit={handleSubmit}>
        <Input placeholder='Search members...' value={search} onChange={handleSearchChange} />
        <InputRightElement>
          <IconButton size='xs' aria-label='search' type='submit' icon={<Icon as={LuSearch} />} />
        </InputRightElement>
      </InputGroup>
      <CreateGroupButton members={data?.members ?? []} />
      <Button leftIcon={<Icon as={LuTrash2} />} variant='outline' colorScheme='red' onClick={onDelete}>
        {t('members_table.delete_all', {
          defaultValue: 'Delete (All)',
        })}
      </Button>
    </Flex>
  )
}

const CreateGroupButton = ({ members }: CreateGroupButtonProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })
  const { selectedRows } = useTable()
  const navigate = useNavigate()
  const createGroupMutation = useCreateGroup()
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const selectedMembers = members ?? selectedRows
  const visible = selectedMembers.slice(0, 5)
  const remainingCount = selectedMembers.length - visible.length

  const createGroup = (data) => {
    const memberIDs = selectedMembers.map((row) => row.id)
    const group = {
      ...data,
      memberIDs,
    }
    createGroupMutation.mutate(group, {
      onSuccess: () => {
        toast({
          title: t('members_table.create_group_success', {
            defaultValue: 'Group created successfully',
          }),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
        navigate(Routes.dashboard.memberbase.groups)
      },
      onError: (error: Error) => {
        toast({
          title: t('members_table.create_group_error', {
            defaultValue: 'Error creating group',
          }),
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <>
      <Button leftIcon={<Icon as={LuUsers} />} variant='outline' colorScheme='gray' onClick={onOpen}>
        {t('members_table.create_group', { defaultValue: 'Create group' })}
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
        <DrawerOverlay />
        <DrawerContent>
          <IconButton
            aria-label='Close drawer'
            icon={<Icon as={LuX} />}
            position='absolute'
            top='6px'
            right='6px'
            onClick={onClose}
            variant='transparent'
          />
          <DrawerHeader display='flex' flexDirection='column' gap={2}>
            <Heading size='md'>
              {t('members_table.create_group_form_title', { defaultValue: 'Create New Group' })}
            </Heading>
            <Text fontSize='sm' color='texts.subtle'>
              {t('members_table.create_group_form_description', {
                defaultValue:
                  'Create a new group from selected members. This will organize them for future voting processes.',
              })}
            </Text>
          </DrawerHeader>
          <FormProvider {...methods}>
            <Box as='form' onSubmit={methods.handleSubmit(createGroup)}>
              <DrawerBody p={4} display='flex' flexDirection='column' gap={4}>
                <InputBasic
                  formValue='title'
                  label={t('members_table.group_name', { defaultValue: 'Group name' })}
                  required
                />
                <InputBasic
                  formValue='description'
                  label={t('members_table.group_description', { defaultValue: 'Description (Optional)' })}
                  placeholder={t('members_table.group_description_placeholder', {
                    defaultValue: 'Enter a brief description of the group',
                  })}
                />
                <Box>
                  <Text mb={1}>{t('members_table.group_members', { defaultValue: 'Selected Members' })}</Text>
                  <Box border='1px' borderColor='table.border' borderRadius='md' p={4}>
                    <Text fontSize='sm' mb={2}>
                      {t('members_table.group_members_count', {
                        defaultValue: '{{count}} members selected',
                        count: selectedMembers.length,
                      })}
                    </Text>
                    <Wrap>
                      {visible.map((member) => (
                        <WrapItem key={member.id}>
                          <Tag borderRadius='sm' size='sm' variant='subtle' colorScheme='gray'>
                            <TagLabel>
                              {member.name} {member.surname}
                            </TagLabel>
                          </Tag>
                        </WrapItem>
                      ))}
                      {remainingCount > 0 && (
                        <WrapItem>
                          <Tag borderRadius='sm' size='sm' variant='outline' colorScheme='black'>
                            <TagLabel>
                              {t('members_table.remaining_members', {
                                defaultValue: '+{{count}} more',
                                count: remainingCount,
                              })}
                            </TagLabel>
                          </Tag>
                        </WrapItem>
                      )}
                    </Wrap>
                  </Box>
                </Box>
              </DrawerBody>
              <Flex justifyContent='flex-end' p={4}>
                <Button variant='outline' onClick={onClose}>
                  {t('members_table.cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button disabled={!selectedMembers.length} colorScheme='black' ml={2} type='submit'>
                  {t('members_table.create_group', { defaultValue: 'Create group' })}
                </Button>
              </Flex>
            </Box>
          </FormProvider>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const MemberBulkActions = ({ onDelete }: MemberBulkActionsProps) => {
  const { t } = useTranslation()
  const { selectedRows } = useTable()

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
          <CreateGroupButton />
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

const MembersList = ({ openDeleteSelected }) => {
  const { data = [], isLoading, isFetching } = useTable()
  const isLoadingOrImporting = isLoading || isFetching
  const isEmpty = data.length === 0 && !isLoadingOrImporting
  return (
    <Tbody>
      {isEmpty ? (
        <EmptyMembers />
      ) : (
        data.map((member) => (
          <MemberTableItem key={member.id} member={member} openDeleteSelected={() => openDeleteSelected(member)} />
        ))
      )}
    </Tbody>
  )
}

const EmptyMembers = () => {
  const { t } = useTranslation()
  const { columns } = useTable()
  const { debouncedSearch } = useOutletContext<MemberbaseTabsContext>()
  return (
    <Tr>
      <Td colSpan={columns.filter((c) => c.visible).length + 2}>
        <Flex justify='center' align='center' height='150px'>
          <Text color='texts.subtle' fontSize='sm'>
            {debouncedSearch
              ? t('members_table.no_filter_results', {
                  defaultValue: 'No members matching these attributes',
                })
              : t('members_table.no_results', {
                  defaultValue: 'No members found',
                })}
          </Text>
        </Flex>
      </Td>
    </Tr>
  )
}

const MemberTableItem = ({ member, openDeleteSelected }) => {
  const { isSelected, toggleOne, columns } = useTable()

  return (
    <Tr>
      <Td>
        <Checkbox isChecked={isSelected(member.id)} onChange={(e) => toggleOne(member.id, e.target.checked)} />
      </Td>
      {columns
        .filter((column) => column.visible)
        .map((column) => (
          <Td key={column.id}>{maskIfNeeded(column.id, member[column.id])}</Td>
        ))}
      <Td>
        <MemberActions member={member} onDelete={() => openDeleteSelected(member)} />
      </Td>
    </Tr>
  )
}

const DeleteMemberModal = ({ isOpen, onClose, mode, ...props }: DeleteMemberModalProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { organization } = useOrganization()
  const deleteMutation = useDeleteMembers()
  const { data: allMembersData, isFetching: isFetchingAll } = usePaginatedMembers({ showAll: true })
  const { selectedRows, resetSelectedRows } = useTable()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const memberIds =
    mode === DeleteModes.SELECTED
      ? selectedRows.map((selectedRow) => selectedRow.id)
      : (allMembersData?.members ?? []).map((member) => member.id)

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(memberIds)
      if (mode === DeleteModes.SELECTED) resetSelectedRows()
      toast({
        title: t('memberbase.delete_member.success', {
          defaultValue: 'Member deleted successfully',
          defaultValue_other: 'Members deleted successfully',
          count: memberIds.length,
        }),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate(generatePath(Routes.dashboard.memberbase.members, { page: 1 }))
      onClose()
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.organization.members(organization?.address),
        exact: false,
      })
    } catch (error) {
      toast({
        title: t('memberbase.delete_member.error', {
          defaultValue: 'Error deleting member',
          defaultValue_other: 'Error deleting members',
          count: memberIds.length,
        }),
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <DeleteModal
      title={t('memberbase.delete_member.title', { defaultValue: 'Delete Members' })}
      subtitle={
        isFetchingAll
          ? t('memberbase.delete_member.loading', {
              defaultValue: 'Loading members to delete...',
            })
          : t('memberbase.delete_member.subtitle', {
              defaultValue: 'Are you sure you want to delete {{count}} member? This action cannot be undone.',
              defaultValue_other: 'Are you sure you want to delete {{count}} members? This action cannot be undone.',
              count: memberIds.length,
            })
      }
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onClose}>
          {t('memberbase.delete_member.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button
          isLoading={deleteMutation.isPending || isFetchingAll}
          colorScheme='red'
          onClick={handleDelete}
          disabled={isFetchingAll || memberIds.length === 0}
        >
          {t('memberbase.delete_member.delete', { defaultValue: 'Delete' })}
        </Button>
      </Flex>
    </DeleteModal>
  )
}

const MembersTable = () => {
  const { t } = useTranslation()
  const [deleteMode, setDeleteMode] = useState<DeleteModes>(DeleteModes.SELECTED)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, isFetching, allVisibleSelected, someSelected, toggleAll, toggleOne, columns } = useTable()
  const isLoadingOrImporting = isLoading || isFetching

  const openDeleteSelected = (member?) => {
    setDeleteMode(DeleteModes.SELECTED)
    if (member) toggleOne(member.id, true)
    onOpen()
  }

  const openDeleteAll = () => {
    setDeleteMode(DeleteModes.ALL)
    onOpen()
  }

  return (
    <>
      <ImportProgress />
      <TableContainer border='1px' borderRadius='sm' borderColor='table.border' overflowX='visible' overflowY='visible'>
        <Flex px={4} pt={4}>
          <Flex direction='column' flex={1} gap={2}>
            <MemberFilters onDelete={openDeleteAll} />
            <MemberBulkActions onDelete={openDeleteSelected} />
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
        {isLoadingOrImporting && <Progress size='xs' isIndeterminate />}
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
          <MembersList openDeleteSelected={openDeleteSelected} />
        </Table>
        <Box p={4}>
          <RoutedPaginatedTableFooter />
        </Box>
      </TableContainer>
      <DeleteMemberModal isOpen={isOpen} onClose={onClose} mode={deleteMode} />
    </>
  )
}

export default MembersTable
