import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormHelperText, Input, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../constants'

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
  const maxLength = {
    value: 40,
    message: t('form.error.field_is_too_long', { max: 40 }),
  }
  const maxLengthDescription = {
    value: 256,
    message: t('form.error.field_is_too_long', { max: 256 }),
  }
  return (
    <Flex flex='1' flexDirection='column' gap={4}>
      <FormControl isInvalid={isInvalidFieldMap(errors, `title`)} mb={1}>
        <Input
          {...register('title', { required, maxLength })}
          placeholder={t('form.process_create.process_title_placeholder').toString()}
        />
        {!!errors.title ? (
          <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.account_create.account_name_note')}</Text>
          </FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={isInvalidFieldMap(errors, `description`)} mb={1}>
        <Textarea
          {...register('description', { maxLength: maxLengthDescription })}
          placeholder={t('form.process_create.process_description_placeholder').toString()}
          variant='outline'
        />
        {!!errors.description ? (
          <FormErrorMessage>{fieldMapErrorMessage(errors, `description`)}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.account_create.account_name_note_description')}</Text>
          </FormHelperText>
        )}
      </FormControl>
    </Flex>
  )
}

export default CreateProcessMeta
