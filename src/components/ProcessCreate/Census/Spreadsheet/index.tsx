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
  const isSaas = import.meta.env.SAAS_URL
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
        gap={5}
        flexDirection={{ base: 'column', lg: 'row' }}
        mb={5}
        alignItems={{ base: 'start', lg: 'stretch' }}
        justifyContent='center'
      >
        <Box flex='1 1 60%'>
          <Flex alignItems='center' gap={1} mb={5} color='text.brand'>
            <Icon as={PiWarningCircleLight} />
            <Text>{t('form.process_create.spreadsheet.requirements.title')}</Text>
          </Flex>
          <UnorderedList mb={4} fontSize='sm'>
            <ListItem mb={2}>
              <Text>{t('form.process_create.spreadsheet.requirements.list_one')}</Text>
            </ListItem>
            <ListItem>
              <Text>{t('form.process_create.spreadsheet.requirements.list_two')}</Text>
            </ListItem>
          </UnorderedList>
          <FormControl variant='custom_data_weighted_vote' fontWeight=''>
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
                  w='full'
                  p={3}
                >
                  <Flex alignItems='center' gap={1}>
                    <Icon as={BiCheckDouble} />
                    <Text fontWeight='bold' mb={1}>
                      <Trans i18nKey='form.process_create.weighted'>Weighted vote</Trans>
                    </Text>
                  </Flex>
                  <Text color='process_create.description' fontSize='sm'>
                    {t('form.process_create.spreadsheet.requirements.list_three')}
                  </Text>
                </Checkbox>
              )}
            />
          </FormControl>
        </Box>
        <Card variant='download-spreadsheet'>
          <CardBody>
            <Text textAlign='center'>{t('form.process_create.spreadsheet.download_template_description')}</Text>
          </CardBody>
          <CardFooter>
            <Link download={'census-template.csv'} href={template.url}>
              <Button
                variant={isSaas ? 'outline' : 'secondary'}
                colorScheme={isSaas && 'whiteAlpha'}
                leftIcon={<BiDownload />}
              >
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
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={5}
          p={10}
          border='1px dotted'
          borderColor='process_create.census.drag_and_drop_border'
          bgColor='process_create.bg'
          borderRadius='xl'
          cursor='pointer'
        >
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
        </Flex>
        <FormErrorMessage display='flex' justifyContent='center'>
          {errors?.spreadsheet?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <CsvPreview manager={manager} upload={upload} />
    </>
  )
}
