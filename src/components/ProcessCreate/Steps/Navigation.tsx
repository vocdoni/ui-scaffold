import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps, useStepContents } from './use-steps'

export const StepsNavigation = () => {
  const { prev, activeStep } = useProcessCreationSteps()
  const { t } = useTranslation()
  const steps = useStepContents()

  return (
    <Box mt='auto'>
      <Flex justifyContent='space-between' mt={6}>
        {activeStep !== steps.findIndex((step) => step.first) && (
          <Button onClick={prev} variant={'tertiary'}>
            <ArrowBackIcon />
            <Text as='span'>{t('form.process_create.previous_step')}</Text>
          </Button>
        )}
        <Button type='submit' variant={'tertiary'} ml='auto' form='process-create-form'>
          <Text as='span'>{t('form.process_create.next_step')}</Text>
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </Box>
  )
}
