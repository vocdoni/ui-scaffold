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
import { PlainCensus, WeightedCensus } from '@vocdoni/sdk'
import { createContext, PropsWithChildren, useContext } from 'react'
import { Checks } from './Checks'
import { Info } from './Info'

interface FormValues {
  title: string
  description: string
  endDate: Date
  startDate: Date
  electionType: {
    autoStart: boolean
    interruptible: boolean
    secretUntilTheEnd: boolean
  }
  maxVoteOverwrites: number
  weightedVote: boolean
  addresses: Address[]
  questions: Question[]
}

interface Question {
  title: string
  description: string
  options: Option[]
}

interface Option {
  option: string
}

interface Address {
  address: string
  weight: number
}

const Steps = () => {
  const steps = [
    { title: 'Checks', Contents: Checks },
    { title: 'Info', Contents: Info },
    { title: 'Questions', Contents: Box },
    { title: 'Census', Contents: Box },
    { title: 'Review & Create', Contents: Box },
  ]

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
      <StepperForm steps={steps} activeStep={activeStep} next={() => setActiveStep(activeStep + 1)} />
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
  next: () => void
  steps: StepsState[]
  // form: FormValues
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

const StepperForm = ({ steps, children, activeStep, next }: PropsWithChildren<StepsContextState>) => {
  const value = { steps, activeStep, next }

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
  const { status, isFirst, isLast } = useStepContext()
  const { next } = useProcessCreationSteps()

  if (status !== 'active') {
    return null
  }

  return <Box flex='1'>{children}</Box>
}

export const getPlainCensus = (addresses: string[]) => {
  const census = new PlainCensus()
  census.add(addresses)

  return census
}
export const getWeightedCensus = (addresses: Address[]) => {
  const census = new WeightedCensus()

  addresses.forEach((add: Address) => {
    census.add({
      key: add.address,
      weight: BigInt(add.weight),
    })
  })

  return census
}
