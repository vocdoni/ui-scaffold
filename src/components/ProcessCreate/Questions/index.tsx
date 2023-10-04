import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FieldError, FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Question from './Question'

interface CustomFieldError extends FieldError {
  index: number
}

const CreateProcessQuestions = () => {
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

  const getQuestionErrorIndex = (index: number): number | null => {
    const questionErrors = errors.questions as FieldErrors<CustomFieldError>[] | undefined
    if (questionErrors && questionErrors[index]) {
      return index
    }
    return null
  }

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

  useEffect(() => {
    const questionErrors = errors.questions as FieldErrors<CustomFieldError>[] | undefined

    if (!questionErrors) return

    const firstError = questionErrors.findIndex((curr) => typeof curr !== 'undefined')
    setTabIndex(firstError)
  }, [errors.questions])

  return (
    <Flex flexDirection='column' gap={5}>
      <Box>
        <Text fontSize='md' fontWeight='bold'>
          {t('form.process_create.question.title')}
        </Text>
        <Text fontSize='sm' color='process_create.description'>
          {t('form.process_create.question.description')}
        </Text>
      </Box>
      {fields.map((_, index) => (
        <Question key={index} index={index} remove={remove} />
      ))}

      <Button
        type='button'
        rightIcon={<AddIcon boxSize={3} />}
        aria-label='add question'
        onClick={() => {
          append({
            title: '',
            description: '',
            options: [{ option: '' }, { option: '' }],
          })
          setTabIndex(questions.length)
        }}
        size='md'
        alignSelf='center'
        px={20}
      >
        {t('form.process_create.question.add_question')}
      </Button>
    </Flex>
  )
}

export default CreateProcessQuestions
