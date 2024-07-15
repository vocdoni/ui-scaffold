import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useBreakpointValue,
  useSteps,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { CspAdminProvider } from '../Census/Csp/use-csp'
import { StepsForm } from './Form'
import { useStepContents } from './use-steps'

const Steps = () => {
  const steps = useStepContents()
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { signer } = useClient()

  return (
    <CspAdminProvider signer={signer}>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ lg: 6 }}>
        <Stepper
          index={activeStep}
          orientation={useBreakpointValue({ base: 'horizontal', lg: 'vertical' })}
          my={{ base: 5, lg: 10 }}
          mb={{ base: 5 }}
          h={{ lg: 124 }}
          mx='auto'
          ml={{ lg: 2.5 }}
          gap={{ base: 3, sm: 5 }}
          justifyContent='center'
          w={{ base: 'full', md: '80%', lg: 'auto' }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <Flex
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'center', lg: 'initial' }}
                gap={3}
                fontFamily='"Archivo", sans-serif'
              >
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <Text
                  as='span'
                  fontSize='xs'
                  mt={{ lg: 2 }}
                  color='process_create.stepper.color'
                  display={{ base: 'none', sm: 'block' }}
                >
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
    </CspAdminProvider>
  )
}

export default Steps
