import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CensusSpreadsheetValues } from '../StepForm/CensusSpreadsheetOnVote'
import { CensusTokenValues } from '../StepForm/CensusTokenOnVote'
import { CensusWeb3Values } from '../StepForm/CensusWeb3OnVote'
import { Info, InfoValues } from '../StepForm/InfoOnVote'
import { Questions, QuestionsValues } from '../StepForm/QuestionsOnVote'
import { Census, CensusValues } from './CensusOnVote'
import { Checks } from './ChecksOnVote'
import { Confirm } from './ConfirmOnVote'

export interface StepsFormValues
  extends InfoValues,
    QuestionsValues,
    CensusValues,
    CensusWeb3Values,
    CensusTokenValues,
    CensusSpreadsheetValues {}

export interface StepsState {
  title: string
  Contents: any
}

export interface StepsContextState {
  activeStep: number
  form: StepsFormValues
  next: () => void
  prev: () => void
  setForm: (vals: StepsFormValues) => void
  steps: StepsState[]
  setActiveStep: Dispatch<SetStateAction<number>>
}

export const StepsContext = createContext<StepsContextState | undefined>(undefined)

export const useProcessCreationSteps = () => {
  const ctxt = useContext(StepsContext)
  if (!ctxt) {
    throw new Error(
      'useCreateProcessSteps returned `undefined`, maybe you forgot to wrap the component within <FormStepper />?'
    )
  }

  return ctxt
}

export const useStepContents = () => {
  const { t } = useTranslation()
  const steps = [
    { title: t('form.process_create.steps.checks'), Contents: Checks },
    { title: t('form.process_create.steps.info'), Contents: Info, first: true },
    { title: t('form.process_create.steps.questions'), Contents: Questions },
    { title: t('form.process_create.steps.census'), Contents: Census },
    { title: t('form.process_create.steps.confirm'), Contents: Confirm },
  ]

  return steps
}
