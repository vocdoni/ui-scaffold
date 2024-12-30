import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Question } from './Question'

interface QuestionsProps {
  title: ReactNode
  description: ReactNode
  isMultiQuestion?: boolean
}

const Questions = ({ title, description, isMultiQuestion = false }: QuestionsProps) => {
  const { t } = useTranslation()
  const { watch } = useFormContext()
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
        <Text fontWeight={'bold'} mb={2}>
          {title}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Flex flexDirection='column' gap={6}>
        {fields.map((_, index) => (
          <Question key={index} index={index} remove={remove} isMultiQuestion={isMultiQuestion} />
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

export default Questions
