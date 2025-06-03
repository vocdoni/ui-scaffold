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
import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LuEllipsis, LuEye, LuEyeOff, LuSearch, LuSettings, LuTrash2, LuUsers } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'

type Participant = {
  [key: string]: string
}

type OrganizationParticipantsResponse = {
  participants?: Participant[]
}

// Simula la query con fetch de participantes
const useOrganizationParticipants = () => {
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

  return (
    <Menu placement='bottom-end'>
      <MenuButton as={IconButton} icon={<LuEllipsis />} variant='ghost' size='sm' />
      <MenuList minW='120px'>
        <MenuItem onClick={() => console.log('Edit', participant)}>
          {t('members_table.edit', { defaultValue: 'Edit' })}
        </MenuItem>
        <MenuDivider />
        <MenuItem color='red.400' onClick={() => deleteMutation.mutate(participant.id)}>
          {t('members_table.delete', { defaultValue: 'Delete' })}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const ColumnManager = ({ columns, setColumns }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

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

const MemberBulkActions = ({ selectedIds }) => {
  const { t } = useTranslation()
  const deleteMutation = useDeleteParticipants()

  const createGroup = () => {
    console.log('Creating group with IDs:', selectedIds)
  }

  const handleBulkDelete = () => {
    deleteMutation.mutate(selectedIds)
  }

  return (
    <Flex gap={4} align='center' minH='42px'>
      {selectedIds.length > 0 ? (
        <>
          <Text fontSize='sm' color='text.subtle'>
            <Trans
              i18nKey='members_table.selected'
              count={selectedIds.length}
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

export const MembersTable = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useOrganizationParticipants()
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [columns, setColumns] = useState([
    { id: 'name', label: t('members_table.name', { defaultValue: 'First Name' }), visible: true },
    { id: 'lastName', label: t('members_table.last_name', { defaultValue: 'Last Name' }), visible: true },
    { id: 'email', label: t('members_table.email', { defaultValue: 'Email' }), visible: true },
  ])

  const filteredParticipants = useMemo(() => {
    return data.filter((participant) =>
      Object.values(participant).some((fieldValue) =>
        String(fieldValue).toLowerCase().includes(globalFilter.toLowerCase())
      )
    )
  }, [data, globalFilter])
  const allVisibleSelected = filteredParticipants.every((p) => selectedIds.includes(p.id))

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const idsOnScreen = filteredParticipants.map((p) => p.id)
      const unique = Array.from(new Set([...selectedIds, ...idsOnScreen]))
      setSelectedIds(unique)
    } else {
      const idsOnScreen = filteredParticipants.map((p) => p.id)
      setSelectedIds((prev) => prev.filter((id) => !idsOnScreen.includes(id)))
    }
  }
  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)))
  }

  if (isLoading) return <Progress isIndeterminate />

  return (
    <TableContainer border='1px' borderRadius='sm' borderColor='table.border'>
      <Flex direction='column' p={4} gap={2}>
        <MemberFilters globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <MemberBulkActions selectedIds={selectedIds} />
      </Flex>

      <Table>
        <Thead>
          <Tr>
            <Th width='50px'>
              <Checkbox isChecked={allVisibleSelected} onChange={(e) => toggleAll(e.target.checked)} />
            </Th>
            {columns
              .filter((column) => column.visible)
              .map((column) => (
                <Th key={column.id}>{column.label}</Th>
              ))}
            <Th width='50px'>
              <ColumnManager columns={columns} setColumns={setColumns} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredParticipants.map((participant) => (
            <Tr key={participant.id}>
              <Td>
                <Checkbox
                  isChecked={selectedIds.includes(participant.id)}
                  onChange={(e) => toggleOne(participant.id, e.target.checked)}
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
