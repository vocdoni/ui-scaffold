import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CensusSpreadsheetValues } from '../StepForm/CensusSpreadsheet'
import { CensusTokenValues } from '../StepForm/CensusToken'
import { CensusWeb3Values } from '../StepForm/CensusWeb3'
import { Info, InfoValues } from '../StepForm/Info'
import { Questions, QuestionsValues } from '../StepForm/Questions'
import { Census, CensusValues } from './Census'
import { Checks } from './Checks'
import { Confirm } from './Confirm'
import { CensusCspValues } from '../StepForm/CensusCsp'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'
import { ExtraFeatures, SaasFeatures } from '~components/ProcessCreate/StepForm/SaasFeatures'

export interface StepsFormValues
  extends InfoValues,
    QuestionsValues,
    CensusValues,
    CensusWeb3Values,
    CensusTokenValues,
    CensusCspValues,
    CensusGitcoinValues,
    CensusSpreadsheetValues,
    ExtraFeatures {}

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
  isLoadingPreview: boolean
  setIsLoadingPreview: (isLoading: boolean) => void
  isLoadingCost: boolean
  setIsLoadingCost: (isLoading: boolean) => void
  notEnoughBalance: boolean
  setNotEnoughBalance: (notEnoughBalance: boolean) => void
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
  let steps = [
    { title: t('form.process_create.steps.checks'), Contents: Checks },
    { title: t('form.process_create.steps.info'), Contents: Info, first: true },
    { title: t('form.process_create.steps.questions'), Contents: Questions },
    { title: t('form.process_create.steps.census'), Contents: Census },
    { title: t('form.process_create.steps.confirm'), Contents: Confirm },
  ]
  if (import.meta.env.SAAS_URL) {
    steps = [
      {
        title: t('form.process_create_saas.steps.info_title', { defaultValue: 'Information' }),
        Contents: Info,
        first: true,
      },
      {
        title: t('form.process_create_saas.steps.questions_title', { defaultValue: 'Questions' }),
        Contents: Questions,
      },
      { title: t('form.process_create_saas.steps.census_title', { defaultValue: 'Census' }), Contents: Census },
      {
        title: t('form.process_create_saas.steps.features_title', { defaultValue: 'Features' }),
        Contents: SaasFeatures,
      },
      { title: t('form.process_create_saas.steps.confirm_title', { defaultValue: 'Confirm' }), Contents: Confirm },
    ]
  }

  return steps
}
