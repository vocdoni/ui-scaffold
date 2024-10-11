import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps, useStepContents } from './use-steps'

export const StepsNavigation = () => {
  const { prev, activeStep } = useProcessCreationSteps()
  const { t } = useTranslation()
  const steps = useStepContents()
  const isSaas = import.meta.env.SAAS_URL

  return (
    <Box mt='auto'>
      <Flex justifyContent='space-between' mt={6}>
        {activeStep !== steps.findIndex((step) => step.first) && (
          <Button colorScheme={isSaas && 'whiteAlpha'} variant={isSaas ? 'rounded' : 'secondary'} onClick={prev}>
            <ArrowBackIcon />
            <Text as='span'>{t('form.process_create.previous_step')}</Text>
          </Button>
        )}
        <Button
          type='submit'
          variant={isSaas ? 'rounded' : 'secondary'}
          ml='auto'
          form='process-create-form'
          width={{ lg: '250px' }}
        >
          <Text as='span'>{t('form.process_create.next_step')}</Text>
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </Box>
  )
}
