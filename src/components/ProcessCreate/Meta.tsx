import { Box, Flex, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import InputCustom from '~components/Layout/InputCustom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const CreateProcessMeta = () => {
  const { textColorSecondary } = useDarkMode()
  const isSaas = import.meta.env.SAAS_URL
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
  const description = watch('description')

  const maxLengthTitle = 500
  const maxLengthDescription = 10000

  return (
    <>
      <Flex flexDirection='column' gap={6}>
        {isSaas ? (
          <Text variant='process-create-subtitle'>
            {t('meta.helper', {
              defaultValue: 'Provide a clear title and description to help voters understand the vote',
            })}
          </Text>
        ) : (
          <Box>
            <Text variant='process-create-title'>{t('form.process_create.meta.title')}</Text>
            <Text variant='process-create-subtitle'>{t('form.process_create.meta.description')}</Text>
          </Box>
        )}

        <InputCustom
          formValue='title'
          label={t('process_create.title', { defaultValue: 'Title' })}
          placeholder={t('process_create.title_placeholder', { defaultValue: 'Title of the voting process' })}
          type='text'
          validation={{
            required: t('form.error.field_is_required'),
            maxLength: {
              value: maxLengthTitle,
              message: t('form.error.password_min_length', { defaultValue: 'Min. 8 characters' }),
            },
          }}
          required
        />
        <Flex flexDirection='column'>
          <Text variant='process-create-title-sm' mb={2}>
            {t('form.process_create.meta.description_label')}
          </Text>
          <Editor
            onChange={(text: string) => setValue('description', text)}
            placeholder={t('form.process_create.meta.description_placeholder').toString()}
            maxLength={maxLengthDescription}
            defaultValue={description}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default CreateProcessMeta
