import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
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
import { cloneElement, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import {
  LuEllipsis,
  LuEye,
  LuEyeOff,
  LuFileDown,
  LuFileSpreadsheet,
  LuPlus,
  LuSearch,
  LuSettings,
  LuTrash2,
  LuUpload,
  LuUsers,
  LuX,
} from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import InputBasic from '~components/shared/Form/InputBasic'
import { QueryKeys } from '~src/queries/keys'
import { ParticipantsCsvManager } from './ParticipantsCsvManager'
import { useTable } from './TableProvider'

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

const ImportMemberbase = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const methods = useForm()

  const onSubmit = ({ spreadsheet }) => {
    const parsedRows = spreadsheet.filedata.map((row: string[]) => {
      return spreadsheet.heading.reduce((acc: Record<string, string>, key: string, index: number) => {
        acc[key] = row[index]
        return acc
      }, {})
    })

    console.log(parsedRows)
  }

  return (
    <>
      <Button ref={btnRef} leftIcon={<Icon as={LuUpload} />} onClick={onOpen}>
        {t('memberbase.importer.button', { defaultValue: 'Import' })}
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='md'>
        <DrawerOverlay />
        <DrawerContent p={1}>
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
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.importer.title', { defaultValue: 'Import Members' })}
            </Heading>
            <Text color='text.subtle' size='sm'>
              {t('memberbase.importer.subtitle', {
                defaultValue: 'Download a template or import your own CSV, XLS, or XLSX file to add members.',
              })}
            </Text>
          </DrawerHeader>

          <DrawerBody display='flex' flexDirection='column' gap={2}>
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.download_template.title', { defaultValue: 'Download Import Template' })}
            </Heading>
            <Text color='text.subtle' size='sm'>
              {t('memberbase.download_template.subtitle', {
                defaultValue:
                  'Download a CSV template with the required columns, then fill it with your member data for import.',
              })}
            </Text>
            <FormProvider {...methods}>
              <Box as='form' id='testing-this' onSubmit={methods.handleSubmit(onSubmit)}>
                <ParticipantsCsvManager />
              </Box>
              <Flex justify='flex-end' gap={2} mt={4}>
                <Button type='button' variant='outline' colorScheme='black' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='black' form='testing-this'>
                  Import
                </Button>
              </Flex>
            </FormProvider>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const RadioCard = ({ label, value, isSelected, onSelect }) => {
  return (
    <Button
      flex='1'
      onClick={() => onSelect(value)}
      p={4}
      leftIcon={<Icon as={LuFileSpreadsheet} boxSize={4} />}
      colorScheme='black'
      variant={isSelected ? 'solid' : 'outline'}
    >
      {label}
      <input type='radio' value={value} checked={isSelected} onChange={() => {}} style={{ display: 'none' }} />
    </Button>
  )
}

export const ExportMemberbase = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { columns, selectedRows } = useTable()

  const methods = useForm({
    defaultValues: {
      fileFormat: 'csv',
      exportedColumns: columns.map((col) => col.id),
    },
  })

  const fileFormats = [
    { label: 'CSV', value: 'csv' },
    { label: 'Excel', value: 'xlsx' },
  ]

  const selectedColumnCount =
    useWatch({
      control: methods.control,
      name: 'exportedColumns',
    })?.length || 0

  const onExport = (data) => {
    console.log('Exporting:', {
      members: selectedRows,
      ...data,
    })
    onClose()
  }

  return (
    <>
      <Button leftIcon={<Icon as={LuFileDown} />} onClick={onOpen}>
        {t('memberbase.exporter.button', { defaultValue: 'Export' })}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.exporter.title', { defaultValue: 'Export Members' })}
            </Heading>
            <Text color='text.subtle' fontSize='sm'>
              {t('memberbase.exporter.subtitle', {
                defaultValue: 'Configure your export options. The export will include {{count}} members.',
                count: selectedRows.length,
              })}
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onExport)}>
              <ModalBody display='flex' flexDirection='column' gap={6}>
                {/* File format */}
                <Box>
                  <Text fontWeight='medium' mb={2}>
                    {t('memberbase.exporter.file_format', { defaultValue: 'File Format' })}
                  </Text>
                  <Controller
                    name='fileFormat'
                    control={methods.control}
                    render={({ field }) => (
                      <Flex gap={2}>
                        {fileFormats.map((format) => (
                          <RadioCard
                            key={format.value}
                            label={format.label}
                            value={format.value}
                            isSelected={field.value === format.value}
                            onSelect={field.onChange}
                          />
                        ))}
                      </Flex>
                    )}
                  />
                </Box>

                {/* Columns */}
                <Box>
                  <Text fontWeight='medium' mb={2}>
                    {t('memberbase.exporter.columns', { defaultValue: 'Columns to Export' })}
                  </Text>
                  <Box border='1px solid' borderColor='gray.700' borderRadius='md' px={4} py={2}>
                    <Stack spacing={3}>
                      <Controller
                        name='exportedColumns'
                        control={methods.control}
                        render={({ field }) =>
                          columns.map((col) => (
                            <Checkbox
                              key={col.id}
                              value={col.id}
                              isChecked={field.value.includes(col.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked
                                const value = col.id
                                field.onChange(
                                  isChecked ? [...field.value, value] : field.value.filter((v) => v !== value)
                                )
                              }}
                              colorScheme='blue'
                            >
                              {col.label}
                            </Checkbox>
                          ))
                        }
                      />
                    </Stack>
                  </Box>
                </Box>
              </ModalBody>

              <ModalFooter display='flex' justifyContent='flex-end' gap={2}>
                <Button variant='outline' onClick={onClose}>
                  {t('memberbase.exporter.cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button type='submit' colorScheme='black'>
                  {t('memberbase.exporter.export', {
                    defaultValue: 'Export {{count}} columns',
                    count: selectedColumnCount,
                  })}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}

export const MemberManager = ({ control, participant = null }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const methods = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      memberId: '',
      nationalId: '',
      birthdate: '',
    },
  })

  useEffect(() => {
    if (participant) {
      methods.reset(participant)
    }
  }, [participant, methods])

  const title = participant
    ? t('memberbase.edit_member.title', { defaultValue: 'Edit Member' })
    : t('memberbase.add_member.title', { defaultValue: 'Add Member' })

  const description = participant
    ? t('memberbase.edit_member.description', { defaultValue: 'Edit the member details below.' })
    : t('memberbase.add_member.description', { defaultValue: 'Fill in the member details below.' })

  const onSubmit = (data) => {
    const { name, email, phone, password, participantNo, lastName, nationalId, birthdate } = data

    const payload = {
      participantNo,
      name,
      email,
      phone,
      password,
      other: {
        lastName,
        nationalId,
        birthdate,
      },
    }

    console.log('Payload', payload)
    onClose()
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      {cloneElement(control, { ref: btnRef, onClick: onOpen })}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='sm'>
        <DrawerOverlay />
        <DrawerContent p={1}>
          <DrawerHeader>
            <Heading size='md'>{title}</Heading>
            <Text fontSize='sm' color='texts.subtle'>
              {description}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Flex as='form' id='member-form' onSubmit={methods.handleSubmit(onSubmit)} flexDirection='column' gap={4}>
              <InputBasic
                formValue='name'
                label={t('memberbase.form.name', { defaultValue: 'First Name' })}
                type='text'
                required
              />
              <InputBasic
                formValue='lastName'
                label={t('memberbase.form.lastname', { defaultValue: 'Last Name' })}
                type='text'
                required
              />
              <InputBasic
                formValue='email'
                label={t('memberbase.form.email', { defaultValue: 'Email' })}
                type='email'
              />
              <InputBasic formValue='phone' label={t('memberbase.form.phone', { defaultValue: 'Phone' })} type='tel' />
              <InputBasic
                formValue='participantNo'
                label={t('memberbase.form.member_id', { defaultValue: 'Member ID' })}
                type='text'
              />
              <InputBasic
                formValue='nationalId'
                label={t('memberbase.form.national_id', { defaultValue: 'National ID' })}
                type='text'
              />
              <InputBasic
                formValue='birthdate'
                label={t('memberbase.form.birthdate', { defaultValue: 'Birthdate' })}
                type='date'
              />
            </Flex>
            <Flex justify='flex-end' gap={2} mt={4}>
              <Button variant='outline' colorScheme='black' onClick={onClose}>
                {t('memberbase.form.cancel', { defaultValue: 'Cancel' })}
              </Button>
              <Button type='submit' colorScheme='black' form='member-form'>
                {t('memberbase.form.save', { defaultValue: 'Save Changes' })}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  )
}

const MembersActions = () => {
  const { t } = useTranslation()

  return (
    <>
      <ImportMemberbase />
      <ExportMemberbase />
      <MemberManager
        control={
          <Button leftIcon={<Icon as={LuPlus} />}>
            {t('memberbase.add_member.button', { defaultValue: 'Add Member' })}
          </Button>
        }
      />
    </>
  )
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
  const { columns, setColumns } = useTable()

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
    filteredData,
    isLoading,
    globalFilter,
    setGlobalFilter,
    selectedRows,
    allVisibleSelected,
    someSelected,
    toggleAll,
    toggleOne,
    columns,
  } = useTable()

  if (isLoading) return <Progress isIndeterminate />

  return (
    <TableContainer border='1px' borderRadius='sm' borderColor='table.border'>
      <Flex px={4} pt={4}>
        <Flex direction='column' flex={1} gap={2}>
          <MemberFilters globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <MemberBulkActions selectedParticipants={selectedRows} />
        </Flex>
        <Flex gap={2}>
          <MembersActions />
        </Flex>
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
          {filteredData.map((participant) => (
            <Tr key={participant.id}>
              <Td>
                <Checkbox
                  isChecked={selectedRows.some((selected) => selected.id === participant.id)}
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
