import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormErrorMessage, IconButton, Input, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FieldError, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
import Options from './Options'

interface Props {
  index: number
  remove: any
}

const Question = ({ index, remove }: Props) => {
  const { t } = useTranslation()
  const {
    watch,
    setValue,
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

  const description = watch(`questions.${index}.description`)

  return (
    <Box p={6} position='relative'>
      <Flex gap={6} mb={2}>
        <FormControl isInvalid={isInvalidFieldMap(errors, `questions.${index}.title`)}>
          <Input
            {...register(`questions.${index}.title`, {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder={t('form.process_create.question.title_placeholder').toString()}
            mb={1}
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
        </FormControl>

        <IconButton
          type='button'
          icon={<DeleteIcon />}
          aria-label={t('form.process_create.question.question_delete', { values: { num: index } })}
          onClick={() => remove(index)}
        />
      </Flex>
      <Editor
        onChange={(text: string) => setValue(`questions.${index}.description`, text)}
        placeholder={t('form.process_create.question.description_placeholder').toString()}
        defaultValue={description}
      />

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />

      <Text variant='question-index'>{index + 1}</Text>
    </Box>
  )
}

interface CustomFieldError extends FieldError {
  index: number
}

interface IQuestionPageProps {
  title: string
  description: string
  isMultiQuestion?: boolean
}

const QuestionPage = ({ title, description, isMultiQuestion = false }: IQuestionPageProps) => {
  const { t } = useTranslation()

  const {
    watch,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
  })

  const questions = watch('questions')

  // If all questions deleted add a new empty question to the form
  useEffect(() => {
    if (questions.length === 0) {
      append({
        title: '',
        description: '',
        options: [{ option: '' }, { option: '' }],
      })
    }
  }, [questions, append])

  return (
    <>
      <Box>
        <Text variant='process-create-title'>{title}</Text>
        <Text variant='process-create-subtitle-sm'>{description}</Text>
      </Box>
      <Flex flexDirection='column' gap={6}>
        {fields.map((_, index) => (
          <Question key={index} index={index} remove={remove} />
        ))}

        {isMultiQuestion && (
          <Button
            type='button'
            rightIcon={<AddIcon boxSize={3} />}
            aria-label={t('form.process_create.question.add_question')}
            onClick={() => {
              append({
                title: '',
                description: '',
                options: [{ option: '' }, { option: '' }],
              })
            }}
            alignSelf='center'
            variant={'outline'}
          >
            {t('form.process_create.question.add_question')}
          </Button>
        )}
      </Flex>
    </>
  )
}

export default QuestionPage
