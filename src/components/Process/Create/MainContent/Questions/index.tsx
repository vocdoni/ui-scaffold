import { Button, Icon, VStack } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { LuPlus } from 'react-icons/lu'
import { DashboardSection } from '~components/shared/Dashboard/Contents'
import { DefaultQuestions, QuestionTypes } from '../..'
import { QuestionForm } from './QuestionForm'
import { QuestionType } from './QuestionType'

export const Questions = () => {
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })
  const questionType = watch('questionType')

  const addQuestion = () => append(DefaultQuestions[questionType])

  return (
    <VStack align='stretch' spacing={4}>
      <DashboardSection>
        <QuestionType />
      </DashboardSection>

      {fields.map((field, index) => (
        <QuestionForm key={field.id} index={index} onRemove={() => remove(index)} />
      ))}

      {questionType === QuestionTypes.Single && (
        <Button leftIcon={<Icon as={LuPlus} />} variant='outline' onClick={addQuestion}>
          <Trans i18nKey='process.create.question.add'>Add question</Trans>
        </Button>
      )}
    </VStack>
  )
}
