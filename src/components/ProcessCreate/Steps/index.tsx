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

  const getStepSeparatorColor = (stepIndex: any) => {
    if (stepIndex < activeStep) {
      return '#E035D0'
    }
  }

  const completeStepStyles = {
    border: '2px solid steps',
    borderColor: '#E035D0',
    color: 'white',
    background: '#E035D0',
  }
  const activeStepStyles = {
    border: '2px solid',
    borderColor: '#E035D0',
    color: 'black',
    background: 'white',
  }

  const getStyles = (index: number) => {
    if (index < activeStep) return completeStepStyles
    if (activeStep === index) return activeStepStyles

    return {}
  }

  return (
    <Flex alignItems='start' gap={6}>
      <Stepper index={activeStep} orientation='vertical' my={10} minH='500px'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator style={getStyles(index)}>
              <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink='0' mt={1}>
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator
              style={{
                backgroundColor: getStepSeparatorColor(index),
              }}
            />
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
