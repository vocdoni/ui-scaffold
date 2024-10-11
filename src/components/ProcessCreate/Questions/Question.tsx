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
      <IconButton
        variant='transparent'
        position='absolute'
        right={2}
        top={8}
        type='button'
        icon={<DeleteIcon />}
        aria-label={t('form.process_create.question.question_delete', { values: { num: index } })}
        onClick={() => remove(index)}
        ml='auto'
      />

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
          maxW='90%'
        />
        <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
      </FormControl>
      <Editor
        onChange={(text: string) => setValue(`questions.${index}.description`, text)}
        placeholder={t('form.process_create.question.description_placeholder').toString()}
        defaultValue={description}
      />

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />

      <Text position='absolute' fontSize='100px' bottom={0} right={5} color='text.brand' opacity={0.2}>
        {index + 1}
      </Text>
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

  const isSaas = import.meta.env.SAAS_URL

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
    <Flex flexDirection='column' gap={5}>
      <Box>
        <Text variant='process-create-title'>{title}</Text>
        <Text variant='process-create-subtitle-sm'>{description}</Text>
      </Box>
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
          variant={isSaas ? 'outline' : 'secondary'}
          colorScheme={isSaas && 'whiteAlpha'}
        >
          {t('form.process_create.question.add_question')}
        </Button>
      )}
    </Flex>
  )
}

export default QuestionPage
