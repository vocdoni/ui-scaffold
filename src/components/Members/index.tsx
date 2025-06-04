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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { cloneElement, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuFileDown, LuFileSpreadsheet, LuPlus, LuUpload, LuX } from 'react-icons/lu'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import InputBasic from '~components/shared/Form/InputBasic'
import { Routes } from '~routes'
import { useMembersTable } from './MembersTableProvider'
import { ParticipantsCsvManager } from './ParticipantsCsvManager'

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
  const { columns, selectedParticipants } = useMembersTable()

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
      members: selectedParticipants,
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
                count: selectedParticipants.length,
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

export const Memberbase = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { label: t('memberbase.members', { defaultValue: 'Members' }), route: Routes.dashboard.memberbase.members },
    { label: t('memberbase.groups', { defaultValue: 'Groups' }), route: Routes.dashboard.memberbase.groups },
  ]
  const currentTabIndex = menuItems.findIndex((item) => location.pathname.endsWith(item.route))

  return (
    <>
      <Flex align='center' gap={2}>
        <Flex flex={1} direction='column'>
          <Heading size='md' fontWeight='extrabold'>
            {t('memberbase.title', {
              defaultValue: 'Memberbase',
            })}
          </Heading>
          <Text mb={4} color='text.subtle'>
            {t('memberbase.subtitle', {
              defaultValue: "Manage your organization's members and create censuses",
            })}
          </Text>
        </Flex>
        <ImportMemberbase />
        <ExportMemberbase />
        <MemberManager
          control={
            <Button leftIcon={<Icon as={LuPlus} />}>
              {t('memberbase.add_member.button', { defaultValue: 'Add Member' })}
            </Button>
          }
        />
      </Flex>
      <Tabs
        variant='settings'
        index={currentTabIndex === -1 ? 0 : currentTabIndex}
        onChange={(index) => {
          const item = menuItems[index]
          navigate(item.route)
        }}
      >
        <TabList mb={6}>
          {menuItems.map((item, index) => (
            <Tab key={index}>{item.label}</Tab>
          ))}
        </TabList>
        <Outlet />
      </Tabs>
    </>
  )
}
