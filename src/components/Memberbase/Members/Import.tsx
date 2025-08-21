import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  ListItem,
  Progress,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { chakraComponents, Select } from 'chakra-react-select'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuCheck, LuTriangleAlert, LuUpload, LuX } from 'react-icons/lu'
import { useOutletContext } from 'react-router-dom'
import { SpreadsheetManager } from '~components/shared/Spreadsheet/SpreadsheetManager'
import { QueryKeys } from '~src/queries/keys'
import { useAddMembers, useImportJobProgress } from '~src/queries/members'
import { MemberbaseTabsContext } from '..'
import { useTable } from '../TableProvider'
import { MembersCsvManager } from './MembersCsvManager'

type SpreadsheetRow = Record<string, string>
type ColumnMapping = Record<string, string>
type MappedRow = Record<string, string>

type FieldsMapperProps = {
  manager?: SpreadsheetManager
  columnMapping: ColumnMapping
  setColumnMapping: React.Dispatch<React.SetStateAction<ColumnMapping>>
}

type ImportDataPreviewProps = {
  columnMapping: ColumnMapping
  setColumnMapping: React.Dispatch<React.SetStateAction<ColumnMapping>>
}

const mapSpreadsheetData = (data: SpreadsheetRow[], mapping: ColumnMapping): MappedRow[] => {
  return data.map((row) => {
    const mappedRow: MappedRow = {}

    for (const targetKey in mapping) {
      const sourceKey = mapping[targetKey]
      if (row[sourceKey] !== undefined) {
        mappedRow[targetKey] = row[sourceKey]
      }
    }

    return mappedRow
  })
}

const TemplateUploader = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={4}>
      <Heading size='md' fontWeight='extrabold'>
        {t('memberbase.download_template.title', { defaultValue: 'Download Import Template' })}
      </Heading>
      <Text color='texts.subtle' size='sm'>
        {t('memberbase.download_template.subtitle', {
          defaultValue:
            'Download the template with your chosen columns, add your member data, and upload the file to set up your memberbase. Once it’s ready, you can start creating votes.',
        })}
      </Text>
      <MembersCsvManager />
    </Stack>
  )
}

export const ImportProgress = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { organization } = useOrganization()
  const { jobId, setJobId } = useOutletContext<MemberbaseTabsContext>()
  const { data, isError } = useImportJobProgress()
  const isComplete = data?.progress === 100
  const hasErrors = data?.errors?.length > 0

  /**
   * Refetches members when import progress reaches 100%.
   * Ensures the members list is up-to-date after a successful import.
   */
  useEffect(() => {
    if (isComplete) {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.organization.members(organization.address),
        exact: false,
      })
    }
  }, [data?.progress, queryClient, organization.address])

  const closeAlert = () => setJobId(null)

  const getStatus = () => {
    if (isComplete && hasErrors) return 'warning'
    if (isComplete) return 'success'
    if (hasErrors || isError) return 'error'
    return 'info'
  }

  const getTitle = () => {
    if (isComplete && hasErrors)
      return t('import_progress.completed_with_errors', { defaultValue: 'Import Completed with Errors' })
    if (isComplete) return t('import_progress.success_title', { defaultValue: 'Import Completed Successfully' })
    if (hasErrors || isError) return t('import_progress.error_title', { defaultValue: 'Import Error' })

    return t('import_progress.title', { defaultValue: 'Memberbase Import in Progress' })
  }

  const getDescription = () => {
    if (isComplete && hasErrors) {
      return (
        <>
          <Text>
            {t('import_progress.completed_with_errors_description', {
              defaultValue:
                'Your member data has been imported, but some errors occurred. Please review the details below.',
            })}
          </Text>
          <UnorderedList mt={2}>
            {data.errors.map((error, index) => (
              <ListItem key={index}>{error}</ListItem>
            ))}
          </UnorderedList>
        </>
      )
    }

    if (isComplete) {
      return (
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
      )
    }

    if (isError) {
      return (
        <Text>
          {t('import_progress.error_description', {
            defaultValue: 'An error occurred while fetching the import progress. Please try again later.',
          })}
        </Text>
      )
    }

    if (hasErrors) {
      return (
        <>
          <Text>
            {t('import_progress.has_errors_description', {
              defaultValue: 'An error occurred while importing your member data. Please try again later.',
            })}
          </Text>
          <UnorderedList mt={2}>
            {data.errors.map((error, index) => (
              <ListItem key={index}>{error}</ListItem>
            ))}
          </UnorderedList>
        </>
      )
    }

    return (
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
    )
  }

  if (!jobId) return null

  return (
    <Alert
      status={getStatus()}
      borderRadius='md'
      mb={3}
      mt={4}
      p={6}
      as={Flex}
      flexDirection='row'
      justifyContent='space-between'
    >
      <Flex flexDirection='column' gap={2} flex={1}>
        <AlertTitle>{getTitle()}</AlertTitle>
        <AlertDescription display='flex' flexDirection='column' gap={2}>
          {getDescription()}
        </AlertDescription>
      </Flex>

      <CloseButton alignSelf='flex-start' position='relative' onClick={closeAlert} />
    </Alert>
  )
}

const FieldsMapper = ({ manager, columnMapping, setColumnMapping }: FieldsMapperProps) => {
  const { t } = useTranslation()
  const { columns } = useTable()

  if (!manager || !manager.data) return null

  const headerOptions = [
    {
      label: t('memberbase.importer.field_mapper.empty', {
        defaultValue: '-- Do not import --',
      }),
      value: '',
    },
    ...manager.header.map((field) => ({
      label: field,
      value: field,
    })),
  ]

  const previewRows = manager.data.slice(0, 3)

  const getCellValue = (row: string[], fieldId: string) => {
    const columnName = columnMapping[fieldId]
    const columnIndex = manager.header.indexOf(columnName)
    return columnIndex !== -1 ? row[columnIndex] : '-'
  }

  const getAvailableOptions = (fieldId: string) => {
    const usedValues = Object.entries(columnMapping)
      .filter(([key, value]) => key !== fieldId && value)
      .map(([_, value]) => value)

    return headerOptions.filter((opt) => !usedValues.includes(opt.value))
  }

  return (
    <HStack flexDirection='column' gap={4} w='full' alignItems='flex-start'>
      <Box borderRadius='lg' borderColor='table.border' borderWidth='1px' p={4} w='full'>
        <Flex borderRadius='lg' borderColor='table.border' borderWidth='1px' p={4} gap={3} mb={2}>
          <Icon as={LuTriangleAlert} boxSize={4} color='texts.subtle' />
          <HStack flexDirection='column' gap={0} alignItems='flex-start'>
            <Heading size='sm' fontWeight='bold'>
              {t('memberbase.importer.warning.title', { defaultValue: 'Warning' })}
            </Heading>
            <Text fontSize='sm' color='texts.subtle'>
              {t('memberbase.importer.warning.subtitle', {
                defaultValue: 'The information of columns that are not mapped will not be imported.',
              })}
            </Text>
          </HStack>
        </Flex>
        <Flex flexDirection='column' gap={4}>
          {columns.map(({ id, label }) => (
            <FormControl key={id}>
              <Flex gap={3} align='center'>
                <FormLabel htmlFor={id} flex='1'>
                  {label}
                </FormLabel>
                <Box flex='1'>
                  <Select
                    id={id}
                    name={id}
                    options={getAvailableOptions(id)}
                    onChange={(selectedOption) =>
                      setColumnMapping((prev) => ({
                        ...prev,
                        [id]: selectedOption?.value || '',
                      }))
                    }
                    value={
                      columnMapping[id] === undefined
                        ? null
                        : (headerOptions.find((opt) => opt.value === columnMapping[id]) ?? null)
                    }
                    placeholder={t('memberbase.importer.field_mapper.placeholder', {
                      defaultValue: 'Select column',
                    })}
                    components={{
                      Option: (props) => {
                        const { isSelected, children } = props
                        return (
                          <chakraComponents.Option {...props}>
                            <Flex align='center' gap={2}>
                              {isSelected && <Icon as={LuCheck} boxSize={4} color='texts.subtle' />}
                              {children}
                            </Flex>
                          </chakraComponents.Option>
                        )
                      },
                    }}
                  />
                </Box>
              </Flex>
            </FormControl>
          ))}
        </Flex>
      </Box>
      <Heading size='md' fontWeight='extrabold'>
        {t('memberbase.importer.data_preview', { defaultValue: 'Data Preview' })}
      </Heading>
      <Box borderColor='table.border' borderWidth='1px' borderRadius='lg' overflowX='auto' w='full'>
        <Table>
          <Thead>
            <Tr>
              {columns.map(({ id, label }) => (
                <Th key={id} fontSize='sm' whiteSpace='nowrap'>
                  {label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {previewRows.map((row, index) => (
              <Tr key={index}>
                {columns.map(({ id }) => (
                  <Td key={id}>{getCellValue(row, id)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HStack>
  )
}

const ImportDataPreview = ({ columnMapping, setColumnMapping }: ImportDataPreviewProps) => {
  const { t } = useTranslation()
  const methods = useFormContext()
  const spreadsheet = useWatch({
    control: methods.control,
    name: 'spreadsheet',
  })

  const resetImport = () => {
    methods.reset()
    setColumnMapping({})
  }

  return (
    <Flex flexDirection='column' gap={4}>
      <Heading size='md' fontWeight='extrabold'>
        {t('memberbase.importer.map_columns.title', { defaultValue: 'Map Columns' })}
      </Heading>
      <Text color='texts.subtle' size='sm'>
        {t('memberbase.importer.map_columns.subtitle', {
          defaultValue:
            'Map columns from your file to the corresponding fields in our system. Required fields are marked with an asterisk (*).',
        })}
      </Text>
      <FieldsMapper manager={spreadsheet} columnMapping={columnMapping} setColumnMapping={setColumnMapping} />
      <Flex justify='space-between' gap={2} mt={4}>
        <Button type='button' variant='outline' colorScheme='black' onClick={resetImport}>
          {t('memberbase.importer.reset', { defaultValue: 'Reset Import' })}
        </Button>
        <Button type='submit' colorScheme='black' form='import-members'>
          {t('memberbase.importer.submit', { defaultValue: 'Import Data' })}
        </Button>
      </Flex>
    </Flex>
  )
}

export const ImportMembers = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const methods = useForm({ defaultValues: { spreadsheet: null } })
  const spreadsheet = useWatch({
    control: methods.control,
    name: 'spreadsheet',
  })
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({})
  const addMembers = useAddMembers(true)
  const { setJobId } = useOutletContext<MemberbaseTabsContext>()

  const hasSpreadsheet = Boolean(spreadsheet?.filedata)

  const onSubmit = async ({ spreadsheet }: { spreadsheet: any }) => {
    const parsedRows: SpreadsheetRow[] = spreadsheet.filedata.map((row: string[]) => {
      return spreadsheet.heading.reduce((acc: SpreadsheetRow, key: string, index: number) => {
        acc[key] = row[index]
        return acc
      }, {})
    })

    const finalData = mapSpreadsheetData(parsedRows, columnMapping)

    try {
      const data = await addMembers.mutateAsync(finalData)
      setJobId(data?.jobId)
      setColumnMapping({})
      methods.reset()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button ref={btnRef} leftIcon={<Icon as={LuUpload} />} variant='outline' onClick={onOpen}>
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
          <DrawerHeader display='flex' flexDirection='column' gap={4}>
            <Heading size='md' fontWeight='extrabold'>
              {t('memberbase.importer.title', { defaultValue: 'Import Members' })}
            </Heading>
            <Text color='texts.subtle' size='sm'>
              {t('memberbase.importer.subtitle', {
                defaultValue: 'Download a template or import your own CSV, XLS, or XLSX file to add members.',
              })}
            </Text>
          </DrawerHeader>
          <DrawerBody display='flex' flexDirection='column' gap={4}>
            <FormProvider {...methods}>
              <Box as='form' id='import-members' onSubmit={methods.handleSubmit(onSubmit)}>
                {!hasSpreadsheet ? (
                  <TemplateUploader />
                ) : (
                  <ImportDataPreview columnMapping={columnMapping} setColumnMapping={setColumnMapping} />
                )}
              </Box>
            </FormProvider>
            <Flex justify='flex-end' gap={4}>
              <Button type='button' variant='outline' colorScheme='black' onClick={onClose}>
                {t('memberbase.importer.cancel', { defaultValue: 'Cancel' })}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
