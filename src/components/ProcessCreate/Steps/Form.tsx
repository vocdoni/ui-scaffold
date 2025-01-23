import { Stepper } from '@chakra-ui/react'
import { ElectionResultsTypeNames } from '@vocdoni/sdk'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useSubscription } from '~components/Auth/Subscription'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
import {
  CensusTypeCsp,
  CensusTypeGitcoin,
  CensusTypeSpreadsheet,
  CensusTypeWeb3,
} from '~components/Process/Census/CensusType'
import type { RecursivePartial } from '~constants'
import { SubscriptionPermission } from '~constants'
import { CensusSpreadsheetManager } from '../Census/Spreadsheet/CensusSpreadsheetManager'
import { StepContents } from './Contents'
import { StepsContext, StepsContextState, StepsFormValues } from './use-steps'

export type StepsFormProps = PropsWithChildren<
  Omit<
    StepsContextState,
    | 'form'
    | 'setForm'
    | 'isLoadingPreview'
    | 'setIsLoadingPreview'
    | 'isLoadingCost'
    | 'setIsLoadingCost'
    | 'notEnoughBalance'
    | 'setNotEnoughBalance'
  >
>

export const StepsForm = ({ steps, activeStep, next, prev, setActiveStep }: StepsFormProps) => {
  const [form, setForm] = useState<RecursivePartial<StepsFormValues>>({
    electionType: {
      autoStart: true,
      interruptible: true,
      liveResults: false, // this is secretUntilTheEnd, but reversed
      anonymous: false,
    },
    resultsType: {
      name: ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION,
    },
    questionType: 'single',
    maxVoteOverwrites: 0,
    weightedVote: false,
    questions: [{ options: [{}, {}] }],
    addresses: [],
    // these do not end up in the election process object, but are required for other purposes
    gpsWeighted: false,
    passportScore: 20,
    stampsUnionType: 'OR',
    features: {
      personalization: false,
      emailReminder: false,
      smsNotification: false,
      whiteLabel: false,
      liveStreaming: false,
    },
  })
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [isLoadingCost, setIsLoadingCost] = useState(false)
  const [notEnoughBalance, setNotEnoughBalance] = useState(false)
  const { permission } = useSubscription()
  const { openModal } = usePricingModal()

  // reinitialize form if we have a draft and `state` is set in the URL
  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('state')) {
      const form = localStorage.getItem('form-draft')
      if (form) {
        const parsed = JSON.parse(form)
        let spreadsheet
        if (parsed.spreadsheet) {
          spreadsheet = new CensusSpreadsheetManager(new File([], 'spreadsheet.csv'))
          spreadsheet.loadFromStorage(parsed.spreadsheet)
        }
        const proper: StepsFormValues = {
          ...parsed,
          spreadsheet,
        }
        setForm(proper)
        setActiveStep(parseInt(localStorage.getItem('form-draft-step') || '0'))
      }
    }
  }, [])

  const setFormInStateAndLocalstorage = async (data: StepsFormValues) => {
    const maxAllowedCensusSize = permission(SubscriptionPermission.MaxCensus)
    let length: number = maxAllowedCensusSize
    switch (data.censusType) {
      case CensusTypeSpreadsheet: {
        if (!data.spreadsheet) {
          break
        }
        length = data.spreadsheet.data.length || 0
        break
      }
      case CensusTypeWeb3: {
        if (!data.addresses) {
          break
        }
        length = data.addresses.length || 0
        break
      }
      case CensusTypeGitcoin:
      case CensusTypeCsp: {
        // I actually have no idea how should I get the length for these cases 🤔
      }
    }
    if (length > maxAllowedCensusSize) {
      openModal('tierUpgrade', {
        value: length,
      })
      return false
    }
    setForm(data)
    localStorage.setItem('form-draft', JSON.stringify(data))
    localStorage.setItem('form-draft-step', (activeStep + 1).toString())
    return true
  }

  const value: StepsContextState = {
    activeStep,
    form: form as StepsFormValues,
    next,
    prev,
    setForm: setFormInStateAndLocalstorage,
    steps,
    setActiveStep,
    isLoadingPreview,
    setIsLoadingPreview,
    isLoadingCost,
    setIsLoadingCost,
    notEnoughBalance,
    setNotEnoughBalance,
  }

  return (
    <StepsContext.Provider value={value}>
      <Stepper index={activeStep} display='flex' flexDirection='column' flexGrow={1}>
        {steps.map((step, index) => {
          const { Contents } = step
          return (
            <StepContents key={index}>
              <Contents />
            </StepContents>
          )
        })}
      </Stepper>
    </StepsContext.Provider>
  )
}
