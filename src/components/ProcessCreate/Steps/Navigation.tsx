import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps, useStepContents } from './use-steps'

export const StepsNavigation = () => {
  const { prev, activeStep } = useProcessCreationSteps()
  const { t } = useTranslation()
  const steps = useStepContents()

  return (
    <Box mt={5}>
      {activeStep !== steps.findIndex((step) => step.first) && (
        <Button onClick={prev}>{t('form.process_create.previous_step')}</Button>
      )}
      <Button type='submit'>{t('form.process_create.next_step')}</Button>
    </Box>
  )
}
