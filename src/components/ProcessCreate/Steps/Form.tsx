import { Stepper } from '@chakra-ui/react'
import type { RecursivePartial } from '@constants'
import { PropsWithChildren, useEffect, useState } from 'react'
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

  useEffect(() => {
    const hash = window.location.hash
    const hashWithoutHashSign = hash.slice(1)
    const [route, queryString] = hashWithoutHashSign.split('?')
    if (new URLSearchParams(queryString).get('loadDraft')) {
      const localForm = localStorage.getItem('form-draft')
      if (localForm) {
        setForm(JSON.parse(localForm))
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
