import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepStatus,
  StepTitle,
  useStepContext,
  useSteps,
} from '@chakra-ui/react'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import type { RecursivePartial } from '../../../constants'
import { CensusValues } from './Census'
import { CensusWeb3Values } from './CensusWeb3'
import { InfoValues } from './Info'
import { QuestionsValues } from './Questions'
import { useStepContents } from './use-step-contents'

interface FormValues extends InfoValues, QuestionsValues, CensusValues, CensusWeb3Values {}

const Steps = () => {
  const steps = useStepContents()

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Flex alignItems='baseline'>
      <Stepper index={activeStep} orientation='vertical' mr={6}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
            </Box>
          </Step>
        ))}
      </Stepper>
      <StepperForm
        steps={steps}
        activeStep={activeStep}
        next={() => setActiveStep(activeStep + 1)}
        prev={() => setActiveStep(activeStep - 1)}
      />
    </Flex>
  )
}
export default Steps

interface StepsState {
  title: string
  Contents: any
}

interface StepsContextState {
  activeStep: number
  form: FormValues
  next: () => void
  prev: () => void
  setForm: (vals: FormValues) => void
  steps: StepsState[]
}

const StepsContext = createContext<StepsContextState | undefined>(undefined)

export const useProcessCreationSteps = () => {
  const ctxt = useContext(StepsContext)
  if (!ctxt) {
    throw new Error(
      'useCreateProcessSteps returned `undefined`, maybe you forgot to wrap the component within <FormStepper />?'
    )
  }

  return ctxt
}

type StepperFormProps = PropsWithChildren<Omit<StepsContextState, 'form' | 'setForm'>>

const StepperForm = ({ steps, children, activeStep, next, prev }: StepperFormProps) => {
  const [form, setForm] = useState<RecursivePartial<FormValues>>({
    electionType: {
      autoStart: false,
      interruptible: true,
      secretUntilTheEnd: true,
    },
    maxVoteOverwrites: 0,
    weightedVote: false,
    questions: [{ options: [{}, {}] }],
    addresses: [{}],
    censusType: 'web3',
  })
  const value: StepsContextState = {
    activeStep,
    form: form as FormValues,
    next,
    prev,
    setForm,
    steps,
  }

  return (
    <StepsContext.Provider value={value}>
      <Stepper index={activeStep} flex='1'>
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

export type StepContentsProps = {}
export type StepProps = Partial<StepContentsProps>

const StepContents = ({ children }: PropsWithChildren<StepContentsProps>) => {
  const { status } = useStepContext()

  if (status !== 'active') {
    return null
  }

  return <Box flex='1'>{children}</Box>
}
