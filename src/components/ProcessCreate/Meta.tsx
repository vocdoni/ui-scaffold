import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'

const CreateProcessMeta = () => {
  const {
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
  const description = watch('description')

  const maxLengthTitle = 500
  const maxLengthDescription = 10000
  return (
    <>
      <Box>
        <Box mb={4}>
          <Text fontSize='md' fontWeight='bold'>
            {t('form.process_create.meta.title')}
          </Text>
          <Text fontSize='sm' color='process_create.description'>
            {t('form.process_create.meta.description')}
          </Text>
        </Box>
        <Box bgColor='process_create.section' p={4} borderRadius='md'>
          <FormControl isInvalid={isInvalidFieldMap(errors, `title`)} mb={3}>
            <FormLabel fontSize='sm' fontWeight='bold' mb={1}>
              {t('form.process_create.meta.title_label')}
            </FormLabel>
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

          <FormControl isInvalid={isInvalidFieldMap(errors, `description`)}>
            <FormLabel fontSize='sm' fontWeight='bold' mb={1}>
              {t('form.process_create.meta.description_label')}
            </FormLabel>
            <Textarea
              {...register('description')}
              maxLength={maxLengthDescription}
              placeholder={t('form.process_create.meta.description_placeholder').toString()}
            />
            {description && description.length > (maxLengthDescription * 70) / 100 && (
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
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default CreateProcessMeta
