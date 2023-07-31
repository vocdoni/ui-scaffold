import { Box, Checkbox, FormControl, FormErrorMessage, Text } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CsvPreview } from './Preview'
import { SpreadsheetManager } from './spreadsheet-manager'

export const CensusCsvManager = () => {
  const [filename, setFilename] = useState<string | undefined>()
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
    async ([file]) => {
      setValue('spreadsheet', undefined)
      setFilename(file.name)
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
    [weighted]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <Box>
      <FormControl>
      <FormControl>
        <Controller
          control={control}
          name='weightedVote'
          render={({field: {onChange, onBlur, value, ref}}) =>
            <Checkbox
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (window.confirm('you sure? it\'ll be removed')) {
                  setValue('spreadsheet', undefined)
                  setFilename()
                  onChange(event)
                }
                setValue('weightedVote', value)
                event.preventDefault()
                event.stopPropagation()
              }}
              onBlur={onBlur}
              ref={ref}
              value={value}
            >
                Weighted vote
            </Checkbox>
          }
        />
      </FormControl>
      </FormControl>
      <FormControl
        {...register('spreadsheet', { required: { value: true, message: t('form.error.field_is_required') } })}
        {...getRootProps()}
        isInvalid={!!errors?.spreadsheet}
      >
        <Box p={10} border='1px dotted gray' borderRadius={10} cursor='pointer'>
          <input {...getInputProps()} accept={SpreadsheetManager.AcceptedTypes} />
          <Text>{isDragActive ? t('uploader.drop_here') : t('uploader.click_or_drag_and_drop')}</Text>
        </Box>
        <FormErrorMessage>{errors?.spreadsheet?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <CsvPreview manager={manager} />
    </Box>
  )
}
