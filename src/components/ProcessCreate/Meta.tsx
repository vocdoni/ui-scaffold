import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, Input, Text, Textarea } from '@chakra-ui/react'
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
  return (
    <Flex flex='1' flexDirection='column' gap={4}>
      <FormControl isInvalid={isInvalidFieldMap(errors, `title`)} mb={1}>
        <Input
          {...register('title', { required, maxLength })}
          placeholder={t('form.process_create.process_title_placeholder').toString()}
          size='lg'
        />
        {!!errors.title ? (
          <FormErrorMessage fontWeight={400} fontSize='xs'>
            {fieldMapErrorMessage(errors, `title`)}
          </FormErrorMessage>
        ) : (
          <Flex alignItems='center' gap={1}>
            <InfoOutlineIcon boxSize={3} color='process_create.account_name_note_logo' />
            <Text fontWeight={400} fontSize='xs' color='process_create.account_name_note'>
              {t('form.account_create.account_name_note')}
            </Text>
          </Flex>
        )}
      </FormControl>

      <FormControl isInvalid={isInvalidFieldMap(errors, `description`)} mb={1}>
        <Textarea
          {...register('description', { maxLength })}
          placeholder={t('form.process_create.process_description_placeholder').toString()}
          variant='outline'
        />
        {!!errors.description ? (
          <FormErrorMessage fontWeight={400} fontSize='xs'>
            {fieldMapErrorMessage(errors, `description`)}
          </FormErrorMessage>
        ) : (
          <Flex alignItems='center' gap={1}>
            <InfoOutlineIcon boxSize={3} color='process_create.account_name_note_logo' />
            <Text fontWeight={400} fontSize='xs' color='process_create.account_name_note'>
              {t('form.account_create.account_name_note')}
            </Text>
          </Flex>
        )}
      </FormControl>
    </Flex>
  )
}

export default CreateProcessMeta
