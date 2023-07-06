import { Stepper } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'
import type { RecursivePartial } from '../../../constants'
import { StepContents } from './Contents'
import { StepsContext, StepsContextState, StepsFormValues } from './use-steps'

export type StepsFormProps = PropsWithChildren<Omit<StepsContextState, 'form' | 'setForm'>>

export const StepsForm = ({ steps, children, activeStep, next, prev, setActiveStep }: StepsFormProps) => {
  const [form, setForm] = useState<RecursivePartial<StepsFormValues>>({
    electionType: {
      autoStart: true,
      interruptible: true,
      secretUntilTheEnd: true,
    },
    maxVoteOverwrites: 0,
    weightedVote: false,
    questions: [{ options: [{}, {}] }],
    addresses: [],
    censusType: null,
  })
  const value: StepsContextState = {
    activeStep,
    form: form as StepsFormValues,
    next,
    prev,
    setForm,
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
