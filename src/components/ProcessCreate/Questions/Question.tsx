import { Box, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'
import { UseFieldArrayRemove, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'
import Options from './Options'

interface Props {
  index: number
  remove: UseFieldArrayRemove
}

const Question = ({ index, remove }: Props) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const {
    fields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  })

  return (
    <>
      <Box>
        <FormControl isInvalid={isInvalidFieldMap(errors, `questions.${index}.title`)} mb={2}>
          <Input
            {...register(`questions.${index}.title`, {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder={t('form.process_create.question.title_placeholder').toString()}
            mb={1}
            fontWeight={700}
            fontSize='xl'
            bgColor='process_create.input.bg'
            _placeholder={{ color: 'black' }}
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Textarea
            {...register(`questions.${index}.description`)}
            placeholder={t('form.process_create.question.description_placeholder').toString()}
            resize='none'
            rows={2}
            mb={1}
            fontSize='md'
            fontWeight={400}
            bgColor='process_create.input.bg'
            _placeholder={{ color: 'black', fontStyle: 'italic' }}
          />
        </FormControl>
      </Box>

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />
    </>
  )
}

export default Question
