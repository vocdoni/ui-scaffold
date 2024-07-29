import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, FormControl, FormErrorMessage, IconButton, Input, Text } from '@chakra-ui/react'
import { FieldError, FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
import Options from './Options'
import { useEffect, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

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
    <Box className='process-create-section' bgColor='process_create.section' p={6} position='relative'>
      <IconButton
        variant='transparent'
        position='absolute'
        right={2}
        top={2}
        size='xs'
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

      <Text position='absolute' fontSize='100px' bottom={0} right={5} color='rgb(245, 247, 250)'>
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

  const [tabIndex, setTabIndex] = useState(0)

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

    if (tabIndex === questions.length && tabIndex !== 0) setTabIndex(questions.length - 1)
  }, [questions, append, tabIndex])

  // Set the tab index to the first question that has an error
  useEffect(() => {
    const questionErrors = errors.questions as FieldErrors<CustomFieldError>[] | undefined

    if (!questionErrors) return

    const firstError = questionErrors.findIndex((curr) => typeof curr !== 'undefined')
    setTabIndex(firstError)
  }, [errors.questions])

  return (
    <Flex flexDirection='column' gap={5}>
      <Box>
        <Text className='process-create-title'>{title}</Text>
        <Text fontSize='sm' color='process_create.description'>
          {description}
        </Text>
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
            setTabIndex(questions.length)
          }}
          alignSelf='center'
          variant='secondary'
        >
          {t('form.process_create.question.add_question')}
        </Button>
      )}
    </Flex>
  )
}

export default QuestionPage
