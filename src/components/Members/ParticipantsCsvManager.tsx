import { Button, Card, CardBody, CardFooter, FormControl, FormErrorMessage, Link } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiDownload } from 'react-icons/bi'
import Uploader from '~components/Layout/Uploader'
import { CsvGenerator } from '~components/ProcessCreate/Census/Spreadsheet/generator'
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

  // CSV templates
  const template = useMemo(() => {
    const header = [
      t('form.process_create.spreadsheet.template.firstname'),
      t('form.process_create.spreadsheet.template.lastname'),
      t('form.process_create.spreadsheet.template.email'),
    ]
    let rows = [
      ['John', 'Doe', 'john@doe.com'],
      ['Joline', 'Doe', 'joline@doe.com'],
    ]

    return new CsvGenerator(header, rows)
  }, [])

  return (
    <>
      <Card variant='download-spreadsheet' border='1px solid' flex={1}>
        <CardBody></CardBody>
        <CardFooter>
          <Link download={'census-template.csv'} href={template.url}>
            <Button variant={'outline'} leftIcon={<BiDownload />}>
              {t('form.process_create.spreadsheet.download_template_btn')}
            </Button>
          </Link>
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
      {/* <CsvPreview manager={manager} upload={upload} /> */}
    </>
  )
}
