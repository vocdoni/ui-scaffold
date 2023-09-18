import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps, useStepContents } from './use-steps'

export const StepsNavigation = () => {
  const { prev, activeStep } = useProcessCreationSteps()
  const { t } = useTranslation()
  const steps = useStepContents()

  return (
    <Box mt='auto'>
      <Flex justifyContent='space-between' mt={5}>
        {activeStep !== steps.findIndex((step) => step.first) && (
          <Button variant='link' color='black' onClick={prev} leftIcon={<ArrowBackIcon />}>
            {t('form.process_create.previous_step')}
          </Button>
        )}
        <Button
          type='submit'
          ml='auto'
          form='process-create-form'
          rightIcon={<ArrowForwardIcon />}
          px={20}
          color='primary.500'
          bgColor='white'
        >
          {t('form.process_create.next_step')}
        </Button>
      </Flex>
    </Box>
  )
}
