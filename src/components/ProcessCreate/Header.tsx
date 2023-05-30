import { Box, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CreateProcessHeader = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <Box flex='1'>
      <FormControl mb={4} isInvalid={!!errors.title} isRequired>
        <FormLabel fontSize='1.3em'>{t('form.process_create.process_title')}</FormLabel>
        <Input
          {...register('title', {
            required,
          })}
          placeholder={t('form.process_create.process_title_placeholder').toString()}
        />
        <FormErrorMessage>{errors.title?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel>{t('form.process_create.process_description')}</FormLabel>
        <Textarea
          {...register('description')}
          placeholder={t('form.process_create.process_description_placeholder').toString()}
        />
        <FormErrorMessage>{errors.description?.message?.toString()}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

export default CreateProcessHeader
