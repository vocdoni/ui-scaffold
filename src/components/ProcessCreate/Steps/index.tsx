import {
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useBreakpointValue,
  useSteps,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { CspAdminProvider } from '../Census/Csp/use-csp'
import { StepsForm } from './Form'
import { useStepContents } from './use-steps'

const Steps = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const steps = useStepContents()
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { signer } = useClient()

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('new_voting'), route: Routes.processes.create }])
  }, [setBreadcrumb])

  return (
    <CspAdminProvider signer={signer}>
      <DashboardContents>
        <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: 6, lg: 20 }} flexGrow={1}>
          <Stepper index={activeStep} orientation={useBreakpointValue({ base: 'horizontal', lg: 'vertical' })}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <StepTitle>{step.title}</StepTitle>
                <StepSeparator />
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
      </DashboardContents>
    </CspAdminProvider>
  )
}

export default Steps
