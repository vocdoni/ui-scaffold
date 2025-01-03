import { Flex, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import InputBasic from '~components/Layout/InputBasic'

const CreateProcessMeta = () => {
  const { setValue, watch } = useFormContext()
  const { t } = useTranslation()
  const description = watch('description')

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  const maxLengthTitle = 500
  const maxLengthDescription = 10000

  return (
    <>
      <Flex flexDirection='column' gap={6}>
        <Text variant='process-create-subtitle'>
          {t('meta.helper', {
            defaultValue: 'Provide a clear title and description to help voters understand the vote',
          })}
        </Text>
        <InputBasic
          formValue='title'
          label={t('process_create.title', { defaultValue: 'Title' })}
          placeholder={t('process_create.title_placeholder', { defaultValue: 'Title of the voting process' })}
          validation={{
            required,
            maxLength: {
              value: maxLengthTitle,
              message: t('form.error.password_min_length', { defaultValue: 'Min. 8 characters' }),
            },
          }}
          labelStyles={{ fontWeight: 'bold' }}
          required
        />
        <Flex flexDirection='column'>
          <Text fontWeight='bold' mb={2}>
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
