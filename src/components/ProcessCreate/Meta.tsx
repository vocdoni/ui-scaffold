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

  return (
    <Flex flex='1' flexDirection='column' gap={4}>
      <FormControl isInvalid={isInvalidFieldMap(errors, `title`)} mb={1}>
        <Input
          {...register('title', { required })}
          placeholder={t('form.process_create.meta.title_placeholder').toString()}
        />
        {!!errors.title ? (
          <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.process_create.meta.title_helper')}</Text>
          </FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={isInvalidFieldMap(errors, `description`)} mb={1}>
        <Textarea
          {...register('description')}
          placeholder={t('form.process_create.meta.description_placeholder').toString()}
          variant='outline'
        />
        {!!errors.description ? (
          <FormErrorMessage>{fieldMapErrorMessage(errors, `description`)}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.process_create.meta.description_helper')}</Text>
          </FormHelperText>
        )}
      </FormControl>
    </Flex>
  )
}

export default CreateProcessMeta
