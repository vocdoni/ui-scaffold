import { Box, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { fieldMapErrorMessage, isInvalidFieldMap } from '@constants'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CreateProcessMeta = () => {
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
              placeholder={t('form.process_create.meta.title_placeholder').toString()}
            />
            <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isInvalidFieldMap(errors, `description`)}>
            <FormLabel fontSize='sm' fontWeight='bold' mb={1}>
              {t('form.process_create.meta.description_label')}
            </FormLabel>
            <Textarea
              {...register('description')}
              placeholder={t('form.process_create.meta.description_placeholder').toString()}
              variant='outline'
            />
            <FormErrorMessage>{fieldMapErrorMessage(errors, `description`)}</FormErrorMessage>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default CreateProcessMeta
