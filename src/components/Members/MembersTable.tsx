import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuEye, LuEyeOff, LuSearch, LuSettings, LuTrash2, LuUsers } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'
import { MemberManager } from '.'
import { useMembersTable } from './MembersTableProvider'

export type Participant = {
  [key: string]: string
}

type OrganizationParticipantsResponse = {
  participants?: Participant[]
}

export const useOrganizationParticipants = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useQuery<Participant[], Error>({
    queryKey: QueryKeys.organization.participants(organization?.address),
    enabled: !!organization?.address,
    queryFn: async () => {
      const response = await bearedFetch<OrganizationParticipantsResponse>(
        ApiEndpoints.OrganizationParticipants.replace('{address}', enforceHexPrefix(organization.address))
      )
      return response.participants || []
    },
  })
}

const useDeleteParticipants = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const client = useQueryClient()

  return useMutation<void, Error, string[]>({
    mutationFn: async (participantIDs: string[]) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationParticipants.replace('{address}', enforceHexPrefix(organization.address)),
        {
          body: {
            participantIDs,
          },
          method: 'DELETE',
        }
      ),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: QueryKeys.organization.participants(organization?.address),
      })
    },
  })
}

const MemberActions = ({ participant }) => {
  const { t } = useTranslation()
  const deleteMutation = useDeleteParticipants()

  const handleDelete = () => {
    deleteMutation.mutate([participant.id])
  }

  return (
    <Menu placement='bottom-end'>
      <MenuButton as={IconButton} icon={<LuEllipsis />} variant='ghost' size='sm' />
      <MenuList minW='120px'>
        <MemberManager
          participant={participant}
          control={<MenuItem>{t('members_table.edit', { defaultValue: 'Edit' })}</MenuItem>}
        />
        <MenuDivider />
        <MenuItem color='red.400' onClick={handleDelete}>
          {t('members_table.delete', { defaultValue: 'Delete' })}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const ColumnManager = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { columns, setColumns } = useMembersTable()

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
                  onClick={() =>
                    setColumns((prev) => prev.map((c) => (c.id === col.id ? { ...c, visible: !c.visible } : c)))
                  }
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

const MemberFilters = ({ globalFilter, setGlobalFilter }) => {
  const { t } = useTranslation()

  return (
    <Flex gap={2}>
      <InputGroup maxW='300px'>
        <InputLeftElement pointerEvents='none'>
          <Icon as={LuSearch} color='text.subtle' />
        </InputLeftElement>
        <Input
          placeholder={t('members_table.search', { defaultValue: 'Search members...' })}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </InputGroup>
      <Button leftIcon={<Icon as={LuUsers} />} variant='outline' colorScheme='gray'>
        {t('members_table.create_group_all', {
          defaultValue: 'Create a group with all members',
        })}
      </Button>
    </Flex>
  )
}

const MemberBulkActions = ({ selectedParticipants }) => {
  const { t } = useTranslation()
  const deleteMutation = useDeleteParticipants()

  const createGroup = () => {
    console.log('Creating group with IDs:', selectedParticipants)
  }

  const handleBulkDelete = () => {
    deleteMutation.mutate(selectedParticipants)
  }

  return (
    <Flex gap={4} align='center' minH='42px'>
      {selectedParticipants.length > 0 ? (
        <>
          <Text fontSize='sm' color='text.subtle'>
            <Trans
              i18nKey='members_table.selected'
              count={selectedParticipants.length}
              components={{ strong: <Text as='span' fontSize='sm' fontWeight='extrabold' display='inline' /> }}
              defaults='Selected: <strong>{{count}} member</strong>'
            />
          </Text>
          <Button leftIcon={<Icon as={LuUsers} />} variant='outline' size='sm' colorScheme='gray' onClick={createGroup}>
            {t('members_table.create_group', {
              defaultValue: 'Create a group',
            })}
          </Button>
          <Button
            leftIcon={<Icon as={LuTrash2} />}
            size='sm'
            colorScheme='red'
            variant='outline'
            onClick={handleBulkDelete}
          >
            {t('members_table.bulk_delete', { defaultValue: 'Delete' })}
          </Button>
        </>
      ) : (
        <Text fontSize='sm' color='text.subtle'>
          <Trans i18nKey='members_table.select_hint' defaults='Select members to perform bulk actions' />
        </Text>
      )}
    </Flex>
  )
}

const MembersTable = () => {
  const {
    isLoading,
    globalFilter,
    setGlobalFilter,
    selectedParticipants,
    allVisibleSelected,
    someSelected,
    toggleOne,
    toggleAll,
    columns,
    setColumns,
    participants,
  } = useMembersTable()

  if (isLoading) return <Progress isIndeterminate />

  return (
    <TableContainer border='1px' borderRadius='sm' borderColor='table.border'>
      <Flex direction='column' px={4} pt={4} gap={2}>
        <MemberFilters globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <MemberBulkActions selectedParticipants={selectedParticipants} />
      </Flex>

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
              .filter((column) => column.visible)
              .map((column) => (
                <Th key={column.id}>{column.label}</Th>
              ))}
            <Th width='50px'>
              <ColumnManager />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {participants.map((participant) => (
            <Tr key={participant.id}>
              <Td>
                <Checkbox
                  isChecked={selectedParticipants.some((selected) => selected.id === participant.id)}
                  onChange={(e) => toggleOne(participant, e.target.checked)}
                />
              </Td>
              {columns
                .filter((column) => column.visible)
                .map((column) => (
                  <Td key={column.id}>{participant[column.id]}</Td>
                ))}
              <Td>
                <MemberActions participant={participant} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justify='space-between' p={4}>
        <Text>Page 1</Text>
        <HStack>
          <IconButton aria-label='Previous' icon={<ChevronLeftIcon />} isDisabled />
          <IconButton aria-label='Next' icon={<ChevronRightIcon />} isDisabled />
        </HStack>
      </Flex>
    </TableContainer>
  )
}

export default MembersTable
