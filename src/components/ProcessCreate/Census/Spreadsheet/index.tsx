import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { BiCheckDouble, BiDownload } from 'react-icons/bi'
import { PiWarningCircleLight } from 'react-icons/pi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { CensusSpreadsheetManager } from './CensusSpreadsheetManager'
import { CsvGenerator } from './generator'
import { CsvPreview } from './Preview'

export const CensusCsvManager = () => {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors },
    control,
  } = useFormContext()
  const weighted: boolean = watch('weightedVote')
  const manager: CensusSpreadsheetManager | undefined = watch('spreadsheet')

  // File dropzone
  const onDrop = useCallback(
    async ([file]: File[]) => {
      setValue('spreadsheet', undefined)
      setError('spreadsheet', {})
      try {
        const spreadsheet = new CensusSpreadsheetManager(file, true, weighted)
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weighted]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: CensusSpreadsheetManager.AcceptedTypes.reduce((prev, curr) => ({ ...prev, [curr]: [] }), {}),
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
    if (weighted) {
      header.unshift(t('form.process_create.spreadsheet.template.weight'))
      rows = rows.map((row, k) => [(k + 1).toString(), ...row])
    }

    return new CsvGenerator(header, rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weighted])

  return (
    <>
      <Flex
        gap={6}
        flexDirection={{ base: 'column', lg: 'row' }}
        mb={6}
        alignItems={{ base: 'start', lg: 'stretch' }}
        justifyContent='center'
      >
        <Flex flexDirection='column' gap={6} flex='1 1 60%'>
          <Flex alignItems='center' gap={1}>
            <Icon as={PiWarningCircleLight} />
            <Text mt={0.5}>{t('form.process_create.spreadsheet.requirements.title')}</Text>
          </Flex>
          <UnorderedList>
            <ListItem mb={2}>
              <Text variant='process-create-subtitle-sm'>
                {t('form.process_create.spreadsheet.requirements.list_one')}
              </Text>
            </ListItem>
            <ListItem>
              <Text variant='process-create-subtitle-sm'>
                {t('form.process_create.spreadsheet.requirements.list_two')}
              </Text>
            </ListItem>
          </UnorderedList>
          <FormControl>
            <Controller
              control={control}
              name='weightedVote'
              defaultValue={weighted}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (!manager) {
                      return setValue('weightedVote', event.target.checked)
                    }
                    if (window.confirm(t('form.process_create.confirm_spreadsheet_removal'))) {
                      setValue('spreadsheet', undefined)
                      setValue('weightedVote', event.target.checked)
                    }
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  isChecked={value}
                  variant={'radiobox'}
                >
                  <Flex>
                    <Icon as={BiCheckDouble} />
                    <Text>
                      <Trans i18nKey='form.process_create.weighted'>Weighted vote</Trans>
                    </Text>
                  </Flex>
                  <Text>{t('form.process_create.spreadsheet.requirements.list_three')}</Text>
                </Checkbox>
              )}
            />
          </FormControl>
        </Flex>
        <Card variant='download-spreadsheet'>
          <CardBody>
            <Text>{t('form.process_create.spreadsheet.download_template_description')}</Text>
          </CardBody>
          <CardFooter>
            <Link download={'census-template.csv'} href={template.url}>
              <Button variant={'outline'} leftIcon={<BiDownload />}>
                {t('form.process_create.spreadsheet.download_template_btn')}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Flex>

      <FormControl
        {...register('spreadsheet', { required: { value: true, message: t('form.error.field_is_required') } })}
        {...upload}
        isInvalid={!!errors?.spreadsheet}
        display={manager?.data.length ? 'none' : 'block'}
      >
        <Card variant='drag-and-drop'>
          <input {...getInputProps()} />
          <Icon as={RiFileExcel2Line} boxSize={20} color='process_create.spreadsheet.file' />
          <Box>
            {isDragActive ? (
              <Text textAlign='center' color='process_create.description'>
                {t('uploader.drop_here')}
              </Text>
            ) : (
              <Trans
                i18nKey='uploader.click_or_drag_and_drop'
                components={{
                  p1: <Text textAlign='center' color='process_create.description' />,
                  p2: <Text textAlign='center' fontSize='sm' color='process_create.description' />,
                }}
              />
            )}
          </Box>
        </Card>
        <FormErrorMessage display='flex' justifyContent='center'>
          {errors?.spreadsheet?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <CsvPreview manager={manager} upload={upload} />
    </>
  )
}
