import {
  Flex,
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
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
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={6}>
      <Stepper index={activeStep} display={{ base: 'none', md: 'flex' }} orientation='vertical' my={10} minH='500px'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <StepTitle>{step.title}</StepTitle>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Stepper index={activeStep} display={{ base: 'flex', md: 'none' }} orientation='horizontal' mx='auto'>
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex width={14} flexDirection='column' alignItems='center'>
              <StepIndicator>
                <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <StepTitle>
                <Text fontSize='sm'>{step.title}</Text>
              </StepTitle>
            </Flex>
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
