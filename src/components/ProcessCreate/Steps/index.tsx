import {
  Box,
  Flex,
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useBreakpointValue,
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
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ md: 6 }}>
      <Stepper
        index={activeStep}
        orientation={useBreakpointValue({ base: 'horizontal', md: 'vertical' })}
        my={{ md: 10 }}
        mb={{ base: 5 }}
        h={{ md: '500px' }}
        mx='auto'
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex
              width={{ base: 14, md: 'min-content' }}
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'center', md: 'initial' }}
              gap={{ md: 2 }}
            >
              <StepIndicator>
                <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{step.title}</Text>
            </Flex>

            <Box display={{ base: 'none', md: 'inline-block' }}>
              <StepSeparator />
            </Box>
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
