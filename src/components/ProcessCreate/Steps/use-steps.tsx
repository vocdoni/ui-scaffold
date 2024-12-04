import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'
import { FeaturesValues, SaasFeatures } from '~components/ProcessCreate/StepForm/Features'
import { CensusCspValues } from '../StepForm/CensusCsp'
import { CensusSpreadsheetValues } from '../StepForm/CensusSpreadsheet'
import { CensusTokenValues } from '../StepForm/CensusToken'
import { CensusWeb3Values } from '../StepForm/CensusWeb3'
import { ConfigurationValues, Info, InfoValues } from '../StepForm/Info'
import { Questions, QuestionsValues } from '../StepForm/Questions'
import { Census, CensusValues } from './Census'
import { Confirm } from './Confirm'

export interface StepsFormValues
  extends InfoValues,
    ConfigurationValues,
    QuestionsValues,
    CensusValues,
    CensusWeb3Values,
    CensusTokenValues,
    CensusCspValues,
    CensusGitcoinValues,
    CensusSpreadsheetValues,
    FeaturesValues {}

export interface StepsState {
  title: string
  Contents: any
}

export interface StepsContextState {
  activeStep: number
  form: StepsFormValues
  next: () => void
  prev: () => void
  setForm: (vals: StepsFormValues) => Promise<boolean>
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

  return steps
}
