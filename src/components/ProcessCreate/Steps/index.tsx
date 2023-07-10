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
    <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ lg: 6 }}>
      <Stepper
        index={activeStep}
        orientation={useBreakpointValue({ base: 'horizontal', lg: 'vertical' })}
        my={{ lg: 10 }}
        mb={{ base: 5 }}
        h={{ lg: 124 }}
        mx='auto'
        gap={{ base: 3, sm: 5 }}
        justifyContent='center'
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems={{ base: 'center', lg: 'initial' }}>
              <StepIndicator>
                <StepStatus complete={<StepNumber />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <Text as='span' fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                {step.title}
              </Text>
            </Flex>

            <Box display={{ base: 'none', lg: 'inline-block' }} mt={5}>
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
        setActiveStep={setActiveStep}
      />
    </Flex>
  )
}

export default Steps
