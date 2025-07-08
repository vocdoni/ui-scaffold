import { Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUnimplementedVotingType } from '~components/ProcessCreate/Questions/useUnimplementedVotingType'
import { MultiQuestionTypes, useVotingType, VotingType } from '~components/ProcessCreate/Questions/useVotingType'
import { TabsPage } from '~components/ProcessCreate/Steps/TabsPage'
import { StepsFormValues, useProcessCreationSteps } from '../Steps/use-steps'

export interface Option {
  option: string
  description?: string
  image?: string
}

export interface Question {
  title: string
  description: string
  options: Option[]
}

export interface QuestionsValues {
  questions: Question[]
  questionType: VotingType | null
}

const QuestionsTabs = () => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()
  const { watch, register, setValue, trigger, getValues } = useFormContext()
  const { replace } = useFieldArray({
    name: `questions`,
  })
  const definedVotingTypes = useVotingType()
  const unDefinedVotingTypes = useUnimplementedVotingType()
  const questions = watch('questions')

  // required in order to force users to select a type, although the error is not visible
  register('questionType', { required: t('form.error.field_is_required') })

  return (
    <TabsPage
      definedList={definedVotingTypes}
      unimplementedList={unDefinedVotingTypes}
      permissionsPath='votingTypes'
      onTabChange={(index: number) => {
        const newQuestionType = definedVotingTypes.defined[index]
        // If the question type not accepts multiquestion and there are multiple questions selcted store only the first
        if (newQuestionType && !MultiQuestionTypes.includes(newQuestionType) && questions.length > 1) {
          replace(questions[0])
        }

        setValue('questionType', newQuestionType, { shouldValidate: true })
        trigger('questionType')

        const nform: StepsFormValues = {
          ...form,
          questionType: newQuestionType,
        }
        setForm(nform)
      }}
      title={t('process_create.question.voting_type.title')}
      description={t('process_create.question.voting_type.description')}
      selected={form.questionType}
    />
  )
}

export const Questions = () => {
  const { form, setForm, next } = useProcessCreationSteps()

  const methods = useForm<QuestionsValues>({
    defaultValues: {
      questions: form.questions,
      questionType: form.questionType,
    },
  })

  const onSubmit: SubmitHandler<QuestionsValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }
  return (
    <FormProvider {...methods}>
      <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
        <QuestionsTabs />
      </Box>
    </FormProvider>
  )
}
