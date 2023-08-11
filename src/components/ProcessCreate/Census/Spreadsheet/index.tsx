import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { ChangeEvent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { BiDownload } from 'react-icons/bi'
import { PiWarningCircleLight } from 'react-icons/pi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { CsvPreview } from './Preview'
import { SpreadsheetManager } from './spreadsheet-manager'

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
  const manager: SpreadsheetManager | undefined = watch('spreadsheet')

  const onDrop = useCallback(
    async ([file]: File[]) => {
      setValue('spreadsheet', undefined)
      setError('spreadsheet', {})
      try {
        const spreadsheet = new SpreadsheetManager(file, weighted)
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
    accept: SpreadsheetManager.AcceptedTypes.reduce((prev, curr) => ({ ...prev, [curr]: [] }), {}),
  })

  const upload = getRootProps()

  return (
    <Box>
      <Flex
        gap={5}
        flexDirection={{ base: 'column', lg: 'row' }}
        mb={5}
        alignItems={{ base: 'start', lg: 'stretch' }}
        justifyContent='center'
      >
        <Box flex='1 1 60%'>
          <Flex alignItems='center' gap={1} mb={5} color='process_create.spreadsheet.requirements_text'>
            <Icon as={PiWarningCircleLight} />
            <Text>{t('form.process_create.spreadsheet.requirements.title')}</Text>
          </Flex>
          <UnorderedList>
            <ListItem mb={2}>
              <Text>{t('form.process_create.spreadsheet.requirements.list_one')}</Text>
            </ListItem>
            <ListItem>
              <Text>{t('form.process_create.spreadsheet.requirements.list_two')}</Text>
            </ListItem>
            <ListItem>
              <Text>{t('form.process_create.spreadsheet.requirements.list_three')}</Text>
            </ListItem>
          </UnorderedList>
        </Box>
        <Flex
          flex='1 1 40%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={3}
          p={6}
          bgColor='white'
          borderRadius='lg'
        >
          <Text textAlign='center'>{t('form.process_create.spreadsheet.download_template_description')}</Text>
          <Button leftIcon={<BiDownload />} colorScheme='primary' variant='ghost' border='1px solid'>
            {t('form.process_create.spreadsheet.download_template_btn')}
          </Button>
        </Flex>
      </Flex>

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
            >
              <Trans i18nKey='form.process_create.weighted'>Weighted vote</Trans>
            </Checkbox>
          )}
        />
      </FormControl>
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
          border='1px dotted lightgray'
          bgColor='white'
          borderRadius='lg'
          cursor='pointer'
        >
          <input {...getInputProps()} />
          <Icon as={RiFileExcel2Line} boxSize={20} color='process_create.spreadsheet.file' />
          <Box>
            {isDragActive ? (
              <Text textAlign='center' color='process_create.spreadsheet.drag_and_drop_text'>
                {t('uploader.drop_here')}
              </Text>
            ) : (
              <Trans
                i18nKey='uploader.click_or_drag_and_drop'
                components={{
                  tos1: <Text textAlign='center' color='process_create.spreadsheet.drag_and_drop_text' />,
                  tos2: <Text textAlign='center' fontSize='sm' color='process_create.spreadsheet.drag_and_drop_text' />,
                }}
              />
            )}
          </Box>
        </Flex>
        <FormErrorMessage>{errors?.spreadsheet?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <CsvPreview manager={manager} upload={upload} />
    </Box>
  )
}
