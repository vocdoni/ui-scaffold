import {
  Box,
  Flex,
  Img,
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
import checkIcon from '/assets/check-icon.svg'

const Steps = () => {
  const steps = useStepContents()
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ lg: 6 }} pt={10}>
      <Stepper
        index={activeStep}
        orientation={useBreakpointValue({ base: 'horizontal', lg: 'vertical' })}
        my={{ lg: 10 }}
        mb={{ base: 10, lg: 0 }}
        h={{ lg: 124 }}
        mx='auto'
        ml={{ lg: 2.5 }}
        gap={{ base: 3, sm: 5 }}
        justifyContent='center'
        flexWrap='wrap'
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems={{ base: 'center', lg: 'initial' }} gap={3}>
              <StepIndicator fontFamily='pixeloidsans'>
                <StepStatus
                  complete={
                    <Box>
                      <Img src={checkIcon} />
                    </Box>
                  }
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Text as='span' mt={{ lg: 2 }} whiteSpace='nowrap' fontSize='14px'>
                {step.title}
              </Text>
            </Flex>

            <Box display={{ base: 'none', lg: 'inline-block' }} mt={5}>
              <StepSeparator />
            </Box>
          </Step>
        ))}
      </Stepper>
      <Box w='full'>
        <StepsForm
          steps={steps}
          activeStep={activeStep}
          next={() => setActiveStep(activeStep + 1)}
          prev={() => setActiveStep(activeStep - 1)}
          setActiveStep={setActiveStep}
        />
      </Box>
    </Flex>
  )
}

export default Steps
