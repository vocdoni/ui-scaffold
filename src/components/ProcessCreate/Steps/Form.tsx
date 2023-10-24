import { Stepper } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import type { RecursivePartial } from '~constants'
import { CensusSpreadsheetManager } from '../Census/Spreadsheet/CensusSpreadsheetManager'
import { StepContents } from './Contents'
import { StepsContext, StepsContextState, StepsFormValues } from './use-steps'

export type StepsFormProps = PropsWithChildren<Omit<StepsContextState, 'form' | 'setForm'>>

export const StepsForm = ({ steps, children, activeStep, next, prev, setActiveStep }: StepsFormProps) => {
  const [form, setForm] = useState<RecursivePartial<StepsFormValues>>({
    electionType: {
      autoStart: true,
      interruptible: true,
      secretUntilTheEnd: true,
      anonymous: false,
    },
    maxVoteOverwrites: 0,
    weightedVote: false,
    questions: [{ options: [{}, {}] }],
    addresses: [],
  })

  // reinitialize form if we have a draft and `loadDraft` is set in the URL
  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('loadDraft')) {
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
    setForm(data)
    localStorage.setItem('form-draft', JSON.stringify(data))
    localStorage.setItem('form-draft-step', (activeStep + 1).toString())
  }

  const value: StepsContextState = {
    activeStep,
    form: form as StepsFormValues,
    next,
    prev,
    setForm: setFormInStateAndLocalstorage,
    steps,
    setActiveStep,
  }

  return (
    <StepsContext.Provider value={value}>
      <Stepper index={activeStep} flex='1' minW={1}>
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
