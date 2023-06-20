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
      return '#00DAAE'
    }
  }

  const completeStepStyles = {
    border: '2px solid',
    borderColor: '#00DAAE',
    color: 'white',
    background: '#00DAAE',
  }
  const activeStepStyles = {
    border: '2px solid',
    borderColor: '#00DAAE',
    color: 'black',
    background: 'white',
  }

  const getStyles = (index: number) => {
    if (index < activeStep) return completeStepStyles
    if (activeStep === index) return activeStepStyles

    return {}
  }

  return (
    <Flex alignItems='start'>
      <Stepper index={activeStep} orientation='vertical' mr={6} my={14} minH='500px' p={2}>
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
