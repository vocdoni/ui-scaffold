import { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Census, CensusValues } from './Census'
import { CensusWeb3Values } from './CensusWeb3'
import { Checks } from './Checks'
import { Confirm } from './Confirm'
import { Info, InfoValues } from './Info'
import { Questions, QuestionsValues } from './Questions'

export interface StepsFormValues extends InfoValues, QuestionsValues, CensusValues, CensusWeb3Values {}

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
    { title: t('form.process_create.steps.census'), Contents: Census },
    { title: t('form.process_create.steps.checks'), Contents: Checks },
    { title: t('form.process_create.steps.info'), Contents: Info, first: true },
    { title: t('form.process_create.steps.questions'), Contents: Questions },
    { title: t('form.process_create.steps.census'), Contents: Census },
    { title: t('form.process_create.steps.confirm'), Contents: Confirm },
  ]

  return steps
}
