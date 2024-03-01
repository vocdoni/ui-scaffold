import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'

const CreateProcessMeta = () => {
  const {
    setValue,
    register,
    formState: { errors },
    watch,
  } = useFormContext()
  const { t } = useTranslation()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const title = watch('title')

  const maxLengthTitle = 500
  const maxLengthDescription = 10000

  return (
    <>
      <Box>
        <Box mb={4}>
          <Text className='process-create-title'>{t('form.process_create.meta.title')}</Text>
          <Text fontSize='sm' color='process_create.description'>
            {t('form.process_create.meta.description')}
          </Text>
        </Box>
        <Box className='process-create-section' bgColor='process_create.section' p={4}>
          <FormControl variant='process-create-label' isInvalid={isInvalidFieldMap(errors, `title`)} mb={3}>
            <FormLabel>{t('form.process_create.meta.title_label')}</FormLabel>
            <Input
              {...register('title', { required })}
              maxLength={maxLengthTitle}
              placeholder={t('form.process_create.meta.title_placeholder').toString()}
            />
            {title && title.length > (maxLengthTitle * 70) / 100 && (
              <FormHelperText>
                <InfoOutlineIcon />
                <Text>
                  {title.length !== maxLengthTitle ? (
                    <Trans i18nKey='meta.length' values={{ maxLength: maxLengthTitle, length: title.length }} />
                  ) : (
                    <Trans i18nKey='meta.maxLength' />
                  )}
                </Text>
              </FormHelperText>
            )}
            <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
          </FormControl>
          <FormLabel>{t('form.process_create.meta.description_label')}</FormLabel>

          <Editor
            onChange={(text: string) => setValue('description', text)}
            placeholder={t('form.process_create.meta.description_placeholder').toString()}
            maxLength={maxLengthDescription}
          />
        </Box>
      </Box>
    </>
  )
}

export default CreateProcessMeta
