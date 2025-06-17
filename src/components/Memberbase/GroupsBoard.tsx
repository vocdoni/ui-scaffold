import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Divider,
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
  Progress,
  SimpleGrid,
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
import { PaginationProvider, usePagination } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { LuCalendar, LuClock, LuEllipsis, LuEye, LuSearch, LuTrash, LuUsers, LuVote, LuX } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { DashboardBox } from '~components/shared/Dashboard/Contents'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { PaginatedTableFooter } from '~components/shared/Pagination/PaginatedTableFooter'
import { Routes } from '~routes'
import { Group, useDeleteGroup, useGroupMembers, useGroups } from '~src/queries/groups'
import { TableProvider, useTable } from './TableProvider'

type GroupActionsProps = {
  group: Group
  onMembersDrawerOpen: () => void
  onDeleteModalOpen: () => void
}

type ViewMembersDrawerProps = {
  group: Group
  isOpen: boolean
  onClose: () => void
  openDeleteModal: () => void
}

type HistoryDrawerProps = {
  group: Group
  isOpen: boolean
  onClose: () => void
}

type GroupCardProps = {
  group: Group
}

const GroupsFilter = () => {
  const { t } = useTranslation()
  return (
    <InputGroup maxW='250px'>
      <InputLeftElement pointerEvents='none'>
        <Icon as={LuSearch} color='texts.subtle' />
      </InputLeftElement>
      <Input placeholder={t('groups_board.search', { defaultValue: 'Search groups...' })} />
    </InputGroup>
  )
}

const GroupsInfo = () => {
  const { t } = useTranslation()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  if (!isOpen) return null

  return (
    <DashboardBox position='relative' flexDirection='column' display='flex' gap={2} p={6} borderColor='table.border'>
      <CloseButton onClick={onClose} position='absolute' top={2} right={2} colorScheme='gray' size='sm' />
      <Flex flexDirection='row' gap={4}>
        <Icon as={LuUsers} boxSize={8} />
        <Flex flexDirection='column' gap={4}>
          <Text fontSize='md' fontWeight='bold'>
            {t('groups_board.info.title', { defaultValue: 'About Groups' })}
          </Text>
          <Text fontSize='sm' lineHeight='16px'>
            {t('groups_board.info.description', {
              defaultValue:
                'Groups are collections of members within your memberbase that can be used to create censuses for voting processes.',
            })}
          </Text>
          <Text fontSize='sm' lineHeight='16px'>
            {t('groups_board.info.extra', {
              defaultValue:
                'When you initiate a vote, a census is created as a time-specific snapshot of the group. Any subsequent changes to the group will not affect existing censuses, but will be reflected in future voting processes.',
            })}
          </Text>
        </Flex>
      </Flex>
    </DashboardBox>
  )
}

const HistoryDrawer = ({ group, isOpen, onClose }: HistoryDrawerProps) => {
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
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
        <DrawerHeader>
          <Flex direction='column' gap={2}>
            <Heading size='md'>
              {t('groups_board.history.title', { defaultValue: '{{ title }} History', title: group.title })}
            </Heading>
            <Text color='texts.subtle' size='sm'>
              {t('groups_board.history.description', {
                defaultValue: 'View the history of this group and its associated censuses',
              })}
            </Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex justify='flex-end'>
            <Button variant='outline' colorScheme='black' onClick={onClose}>
              {t('groups_board.history.close', { defaultValue: 'Close' })}
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

const GroupActions = ({ group, onMembersDrawerOpen, onDeleteModalOpen }: GroupActionsProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure()

  return (
    <>
      <Menu placement='bottom-end'>
        <MenuButton
          as={IconButton}
          aria-label={t('actions.more', { defaultValue: 'More options' })}
          icon={<Icon as={LuEllipsis} />}
          variant='ghost'
          size='sm'
        />
        <MenuList minW='100px' fontSize='sm'>
          <MenuItem icon={<Icon boxSize={4} as={LuEye} />} onClick={onMembersDrawerOpen}>
            {t('group.actions.view_members', { defaultValue: 'View Members' })}
          </MenuItem>
          <MenuItem icon={<Icon boxSize={4} as={LuVote} />} onClick={() => navigate(Routes.processes.create)}>
            {t('group.actions.create_vote', { defaultValue: 'Create a Vote' })}
          </MenuItem>
          <MenuItem icon={<Icon boxSize={4} as={LuClock} />} onClick={onHistoryOpen}>
            {t('group.actions.history', { defaultValue: 'History' })}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            // isDisabled={true}
            icon={<Icon boxSize={4} as={LuTrash} />}
            color='red.500'
            onClick={onDeleteModalOpen}
          >
            {t('group.actions.delete_group', { defaultValue: 'Delete Group' })}
          </MenuItem>
        </MenuList>
      </Menu>
      <HistoryDrawer group={group} isOpen={isHistoryOpen} onClose={onHistoryClose} />
    </>
  )
}

const GroupMembersTable = () => {
  const { t } = useTranslation()
  const { filteredData, isLoading, columns } = useTable()
  const isEmpty = filteredData.length === 0 && !isLoading

  return (
    <>
      <TableContainer border='1px' borderRadius='sm' borderColor='table.border' overflowX='visible' overflowY='visible'>
        {isEmpty ? (
          <Flex justify='center' align='center' height='200px'>
            <Text color='texts.subtle' fontSize='sm'>
              {t('members_table.no_results', {
                defaultValue: 'No members found',
              })}
            </Text>
          </Flex>
        ) : (
          <>
            {isLoading && <Progress isIndeterminate />}
            <Table>
              <Thead>
                <Tr>
                  {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <Th key={col.id}>{col.label}</Th>
                    ))}
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((member) => (
                  <Tr key={member.id}>
                    {columns
                      .filter((column) => column.visible)
                      .map((column) => (
                        <Td key={column.id}>{member[column.id]}</Td>
                      ))}
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
    </>
  )
}

const ViewMembersDrawer = ({ group, isOpen, onClose, openDeleteModal }: ViewMembersDrawerProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useGroupMembers(group.id, isOpen)
  const navigate = useNavigate()

  const members = data?.members || []
  const pagination = data?.pagination || {
    totalItems: 1,
    currentPage: 0,
    lastPage: 0,
    previousPage: null,
    nextPage: null,
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='lg'>
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
        <DrawerHeader>
          <Flex direction='column' gap={2}>
            <Heading size='md'>{group.title}</Heading>
            <Text color='texts.subtle' size='sm'>
              {`${t('group.created_on', {
                defaultValue: 'Created {{date}}',
                date: new Date(group.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              })} • ${t('group.members', {
                defaultValue: '{{count}} member',
                defaultValue_other: '{{count}} members',
                count: group.membersCount,
              })}`}
            </Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <GroupMembersDisplay group={group} isOpen={isOpen} />
          <Divider my={4} />
          <Flex direction='column' gap={4}>
            <Text fontWeight='extrabold' size='sm'>
              {t('group.actions_title', { defaultValue: 'Actions' })}
            </Text>
            <Text size='xs' color='texts.subtle'>
              {t('group.actions_description', {
                defaultValue:
                  "When a new vote is created, the system takes a snapshot of the group's members at that moment. Any changes to the member list afterward will not affect the created census.",
              })}
            </Text>
            <Button
              justifyContent='flex-start'
              colorScheme='black'
              variant='outline'
              leftIcon={<Icon as={LuVote} boxSize={4} />}
              size='xs'
              onClick={() => navigate(Routes.processes.create, { state: { groupId: group.id } })}
            >
              {t('group.create_vote', { defaultValue: 'Create a Vote' })}
            </Button>
          </Flex>
          <Flex justify='flex-end'>
            <Button
              // disabled={true}
              leftIcon={<Icon as={LuTrash} boxSize={4} />}
              onClick={openDeleteModal}
              colorScheme='red'
              variant='outline'
              size='xs'
              mt={4}
            >
              <Text>{t('group.delete_group', { defaultValue: 'Delete group' })}</Text>
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

const GroupMembersDisplay = ({ group, isOpen }) => {
  const { data } = useGroupMembers(group.id, 0, isOpen)

  if (!data) return null // o un loader

  const pagination = data.pagination

  return (
    <PaginationProvider pagination={pagination}>
      <GroupMembersWithPagination group={group} isOpen={isOpen} />
    </PaginationProvider>
  )
}

const GroupMembersWithPagination = ({ group, isOpen }) => {
  const { page } = usePagination()

  const { data, isLoading } = useGroupMembers(group.id, page, isOpen)

  const members = data?.members ?? []

  return (
    <TableProvider
      data={members}
      isLoading={isLoading}
      initialColumns={[
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
      ]}
    >
      <GroupMembersTable />
    </TableProvider>
  )
}

const DeleteGroupModal = ({ group, isOpen, onClose }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const deleteGroupMutation = useDeleteGroup()

  const handleDelete = () => {
    deleteGroupMutation.mutate(group.id, {
      onSuccess: () => {
        toast({
          title: t('group.actions.delete_success', { defaultValue: 'Group deleted successfully' }),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      },
      onError: (error) => {
        toast({
          title: t('group.actions.delete_error', { defaultValue: 'Error deleting group' }),
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <DeleteModal
      title={t('group.actions.delete_confirm_title', { defaultValue: 'Delete Group' })}
      subtitle={
        <Trans
          i18nKey='group.actions.delete_confirm_description'
          values={{ title: group.title }}
          components={{ bold: <Text as='span' size='sm' fontWeight='extrabold' /> }}
          defaults='Are you sure you want to delete <bold>{{title}}</bold>? This action cannot be undone and will permanently remove the group from your organization.'
        />
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onClose}>
          {t('group.actions.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button colorScheme='red' onClick={handleDelete}>
          {t('group.actions.delete', { defaultValue: 'Delete' })}
        </Button>
      </Flex>
    </DeleteModal>
  )
}

const GroupCard = ({ group }: GroupCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen: isMembersDrawerOpen, onOpen: onMembersDrawerOpen, onClose: onMembersDrawerClose } = useDisclosure()
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()

  return (
    <>
      <Card variant='outline' borderColor='table.border' p={4} pt={2}>
        <CardHeader p={0}>
          <Flex justify='space-between' align='center'>
            <Heading size='md'>{group.title}</Heading>
            <GroupActions
              group={group}
              onMembersDrawerOpen={onMembersDrawerOpen}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          </Flex>
        </CardHeader>
        <CardBody p={0}>
          <Flex direction='column' gap={2}>
            <Flex align='center' gap={2}>
              <Icon as={LuCalendar} boxSize={3.5} />
              <Text color='texts.subtle' size='sm'>
                {t('group.created_on', {
                  defaultValue: 'Created {{date}}',
                  date: new Date(group.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                })}
              </Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Icon as={LuUsers} boxSize={3.5} />
              <Text
                onClick={onMembersDrawerOpen}
                fontWeight='bold'
                size='sm'
                cursor='pointer'
                _hover={{ textDecoration: 'underline' }}
              >
                {t('group.members', {
                  defaultValue: '{{count}} member',
                  defaultValue_other: '{{count}} members',
                  count: group.membersCount,
                })}
              </Text>
            </Flex>
            <Text size='sm' color='texts.subtle'>
              {group.description}
            </Text>
          </Flex>
        </CardBody>
        <CardFooter px={0} pb={0}>
          <Button
            colorScheme='black'
            w='full'
            size='xs'
            leftIcon={<Icon boxSize={4} as={LuVote} />}
            onClick={() => navigate(Routes.processes.create)}
          >
            <Text size='xs'>{t('group.create_vote', { defaultValue: 'Create a Vote' })}</Text>
          </Button>
        </CardFooter>
      </Card>
      <ViewMembersDrawer
        group={group}
        isOpen={isMembersDrawerOpen}
        onClose={onMembersDrawerClose}
        openDeleteModal={onDeleteModalOpen}
      />
      <DeleteGroupModal group={group} isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} />
    </>
  )
}

const GroupsBoard = () => {
  const { t } = useTranslation()
  const { data: groups, isLoading, error, isFetched, fetchNextPage, hasNextPage, isFetchingNextPage } = useGroups()
  const noGroups = isFetched && (!groups || groups.length === 0)

  if (isLoading) return <Progress isIndeterminate />

  if (error)
    return (
      <Flex direction='column' align='center' justify='center' h='100%'>
        <Text fontWeight='bold'>{error.message}</Text>
      </Flex>
    )

  if (noGroups) {
    return (
      <Flex direction='column' align='center' justify='center' h='100%'>
        <Text fontWeight='bold'>No groups found</Text>
        <Text mt={2} color='texts.subtle'>
          Create a new group to get started.
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button
          mt={4}
          alignSelf='center'
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          loadingText='Loading...'
          colorScheme='black'
          variant='outline'
        >
          {t('groups_board.load_more', { defaultValue: 'Load more' })}
        </Button>
      )}
    </>
  )
}

const Groups = () => {
  return (
    <Flex direction='column' gap={4}>
      <GroupsInfo />
      <GroupsFilter />
      <GroupsBoard />
    </Flex>
  )
}

export default Groups
