import { DeleteIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input } from '@chakra-ui/react'
import { useFieldArray, UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'
import OptionsForm from './OptionsForm'

interface Props {
  index: number
  remove: UseFieldArrayRemove
}

const QuestionsForm = ({ index, remove }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  const {
    fields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  })

  const num = index + 1

  return (
    <Box bg='white' p={{ base: 2, sm: 4 }} borderRadius={8} _dark={{ bg: 'black.c60' }}>
      <HStack justify='space-between' mb={4}>
        <FormLabel>{t('form.process_create.question_identifier', { num })}</FormLabel>

        <IconButton
          type='button'
          size='sm'
          icon={<DeleteIcon />}
          aria-label={t('form.process_create.question_delete', { num })}
          onClick={() => remove()}
        />
      </HStack>
      <FormControl mb={4} isInvalid={isInvalidFieldMap(errors, `questions.${index}.title`)}>
        <FormLabel>{t('form.process_create.question_title', { num })}</FormLabel>
        <Input
          {...register(`questions.${index}.title`, {
            required: {
              value: true,
              message: t('form.error.field_is_required'),
            },
          })}
          placeholder={t('form.process_create.question_placeholder', {
            num,
          }).toString()}
        />
        <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input {...register(`questions.${index}.description`)} placeholder='Description' />
      </FormControl>

      <OptionsForm
        fields={fields}
        register={register}
        removeOption={removeOption}
        appendOption={appendOption}
        index={index}
      />
    </Box>
  )
}

export default QuestionsForm
