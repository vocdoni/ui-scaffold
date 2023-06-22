import {
  Box,
  Flex,
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react'
import { StepsForm } from './Form'
import { useStepContents } from './use-steps'

const Steps = () => {
  const steps = useStepContents()
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Flex alignItems='start' gap={6}>
      <Stepper index={activeStep} orientation='vertical' my={10} minH='500px'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink='0' mt={1}>
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <StepsForm
        steps={steps}
        activeStep={activeStep}
        next={() => setActiveStep(activeStep + 1)}
        prev={() => setActiveStep(activeStep - 1)}
      />
    </Flex>
  )
}

export default Steps
