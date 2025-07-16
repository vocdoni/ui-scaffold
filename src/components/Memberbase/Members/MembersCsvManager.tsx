import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuFileSpreadsheet } from 'react-icons/lu'
import Uploader from '~components/shared/Layout/Uploader'
import { CsvGenerator } from '~components/shared/Spreadsheet/generator'
import { SpreadsheetManager } from '~components/shared/Spreadsheet/SpreadsheetManager'
import { useTable } from '../TableProvider'

const generateFakeValue = (columnId: string): string => {
  switch (columnId) {
    case 'name':
      return 'John'
    case 'surname':
      return 'Doe'
    case 'email':
      return 'john@doe.com'
    case 'phone':
      return '+1234567890'
    case 'memberID':
      return '123456'
    case 'nationalId':
      return '987654321'
    case 'birthDate':
      return '1990-01-01'
    default:
      return ''
  }
}

export const MembersCsvManager = () => {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useFormContext()
  const { columns } = useTable()
  const manager: SpreadsheetManager | undefined = watch('spreadsheet')

  // File dropzone
  const onDrop = useCallback(async ([file]: File[]) => {
    setValue('spreadsheet', undefined)
    setError('spreadsheet', {})
    try {
      const spreadsheet = new SpreadsheetManager(file, true)
      await spreadsheet.read()
      setValue('spreadsheet', spreadsheet)
    } catch (e) {
      if (e instanceof Error) {
        setError('spreadsheet', {
          type: e.name,
          message: e.message,
        })
      }
      console.error('could not load file:', e)
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: SpreadsheetManager.AcceptedTypes.reduce((prev, curr) => ({ ...prev, [curr]: [] }), {}),
  })
  const upload = getRootProps()
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'surname', 'email'])
  const handleColumnChange = (value: string[]) => setVisibleColumns(value)
  const template = useMemo(() => {
    const header = columns.filter((column) => visibleColumns.includes(column.id)).map((column) => column.label)
    const rows = columns
      .filter((column) => visibleColumns.includes(column.id))
      .map((column) => generateFakeValue(column.id))

    return new CsvGenerator(header, [rows])
  }, [visibleColumns])

  return (
    <Flex flexDirection='column' gap={4}>
      <Card>
        <CardBody display='flex' flexDirection='column' gap={2}>
          <Text>
            {t('memberbase.importer.included_columns', {
              defaultValue: 'Select columns to include:',
            })}
          </Text>
          <CheckboxGroup value={visibleColumns} onChange={handleColumnChange}>
            {columns.map((column) => (
              <Checkbox key={column.id} value={column.id}>
                {column.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </CardBody>
        <CardFooter display='flex' flexDirection='column' gap={2}>
          <Button
            as={Link}
            type='button'
            variant='outline'
            leftIcon={<LuFileSpreadsheet />}
            isDisabled={!visibleColumns.length}
            w='100%'
            {...(visibleColumns.length && {
              as: Link,
              href: template.url,
              download: 'memberbase-template.csv',
              type: 'button',
            })}
          >
            {t('memberbase.importer.download_template_btn', {
              defaultValue: 'Download Template',
            })}
          </Button>
          {!visibleColumns.length && (
            <Text fontSize='sm' color='gray.500' mt={1}>
              {t('memberbase.importer.select_at_least_one_column', {
                defaultValue: 'Select at least one column to download the template.',
              })}
            </Text>
          )}
        </CardFooter>
      </Card>

      <FormControl
        {...register('spreadsheet', {
          required: { value: true, message: t('memberbase.importer.error.field_is_required') },
        })}
        {...upload}
        isInvalid={!!errors?.spreadsheet}
        display={manager?.data.length ? 'none' : 'block'}
      >
        <Stack gap={4}>
          <Heading size='md' fontWeight='extrabold'>
            {t('memberbase.import_file.title', { defaultValue: 'Import File' })}
          </Heading>
          <Text color='texts.subtle' size='sm'>
            {t('memberbase.import_file.subtitle', {
              defaultValue:
                'Import your CSV, XLS, or XLSX file containing member data. Ensure column headers match the template for accurate mapping.',
            })}
          </Text>
          <Uploader getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />
          <FormErrorMessage display='flex' justifyContent='center'>
            {errors?.spreadsheet?.message?.toString()}
          </FormErrorMessage>
        </Stack>
      </FormControl>
    </Flex>
  )
}
