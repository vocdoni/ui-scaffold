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
  Link,
  Text,
} from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuFileSpreadsheet } from 'react-icons/lu'
import Uploader from '~components/Layout/Uploader'
import { CsvGenerator } from '~components/ProcessCreate/Census/Spreadsheet/generator'
import { CsvPreview } from '~components/ProcessCreate/Census/Spreadsheet/Preview'
import { SpreadsheetManager } from '~components/ProcessCreate/Census/Spreadsheet/SpreadsheetManager'

export const ParticipantsCsvManager = () => {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useFormContext()
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

  const [columns, setColumns] = useState<string[]>(['firstname', 'lastname', 'email'])

  const allColumns = [
    {
      label: t('form.participants.spreadsheet.template.firstname', { defaultValue: 'First Name' }),
      value: 'firstname',
    },
    { label: t('form.participants.spreadsheet.template.lastname', { defaultValue: 'Last Name' }), value: 'lastname' },
    { label: t('form.participants.spreadsheet.template.email', { defaultValue: 'Email' }), value: 'email' },
    { label: t('form.participants.spreadsheet.template.phone', { defaultValue: 'Phone' }), value: 'phone' },
    {
      label: t('form.participants.spreadsheet.template.national_id', { defaultValue: 'National ID' }),
      value: 'national_id',
    },
    {
      label: t('form.participants.spreadsheet.template.member_id', { defaultValue: 'Member ID' }),
      value: 'member_id',
    },
    {
      label: t('form.participants.spreadsheet.template.birth_date', { defaultValue: 'Birth Date' }),
      value: 'birth_date',
    },
  ]

  const handleColumnChange = (value: string[]) => setColumns(value)

  const template = useMemo(() => {
    const header = allColumns.filter((col) => columns.includes(col.value)).map((col) => col.label)

    return new CsvGenerator(header, [])
  }, [columns])

  return (
    <Flex flexDirection='column' gap={4}>
      <Card variant='outline'>
        <CardBody display='flex' flexDirection='column' gap={2}>
          <Text>Select columns to include:</Text>
          <CheckboxGroup value={columns} onChange={handleColumnChange}>
            {allColumns.map((col) => (
              <Checkbox key={col.value} value={col.value}>
                {col.label}
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
            isDisabled={!columns.length}
            w='100%'
            {...(columns.length && {
              as: Link,
              href: template.url,
              download: 'memberbase-template.csv',
              type: 'button',
            })}
          >
            {t('form.participants.spreadsheet.download_template_btn')}
          </Button>
          {!columns.length && (
            <Text fontSize='sm' color='gray.500' mt={1}>
              {t('form.participants.spreadsheet.select_at_least_one_column', {
                defaultValue: 'Select at least one column to download the template.',
              })}
            </Text>
          )}
        </CardFooter>
      </Card>

      <FormControl
        {...register('spreadsheet', { required: { value: true, message: t('form.error.field_is_required') } })}
        {...upload}
        isInvalid={!!errors?.spreadsheet}
        display={manager?.data.length ? 'none' : 'block'}
      >
        <Uploader getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />{' '}
        <FormErrorMessage display='flex' justifyContent='center'>
          {errors?.spreadsheet?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <CsvPreview manager={manager} upload={upload} />
    </Flex>
  )
}
