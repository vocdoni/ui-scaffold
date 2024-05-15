import { FormProvider, useForm } from 'react-hook-form'
import { StepsFormValues, useProcessCreationSteps } from '../Steps/use-steps'
import { useVotingType, VotingType } from '~components/ProcessCreate/Questions/useVotingType'
import { useUnimplementedVotingType } from '~components/ProcessCreate/Questions/useUnimplementedVotingType'
import { useTranslation } from 'react-i18next'
import { TabsPage } from '~components/ProcessCreate/Steps/TabsPage'

export interface Option {
  option: string
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

export const Questions = () => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()

  const methods = useForm<QuestionsValues>({
    defaultValues: {
      questions: form.questions,
    },
  })

  const definedVotingTypes = useVotingType()
  const unDefinedVotingTypes = useUnimplementedVotingType()
  const { questionType } = form

  return (
    <FormProvider {...methods}>
      <TabsPage
        definedList={definedVotingTypes}
        unimplementedList={unDefinedVotingTypes}
        onTabChange={(index: number) => {
          const nform: StepsFormValues = {
            ...form,
            questionType: definedVotingTypes.defined[index],
            questions: [form.questions[0]], // Remove created questions to avoid send multiple questions if not single choice
          }
          setForm(nform)
        }}
        title={t('process_create.question.voting_type.title')}
        description={t('process_create.question.voting_type.description')}
        selected={questionType}
      />
    </FormProvider>
  )
}
