import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps, useStepContents } from './use-steps'

export const StepsNavigation = () => {
  const { prev, activeStep } = useProcessCreationSteps()
  const { t } = useTranslation()
  const steps = useStepContents()

  return (
    <Flex justifyContent='space-between' mt={5}>
      {activeStep !== steps.findIndex((step) => step.first) && (
        <Button variant='prev' onClick={prev} leftIcon={<ArrowBackIcon />}>
          {t('form.process_create.previous_step')}
        </Button>
      )}
      <Button variant='next' type='submit' form='process-create-form' rightIcon={<ArrowForwardIcon />}>
        {t('form.process_create.next_step')}
      </Button>
    </Flex>
  )
}
