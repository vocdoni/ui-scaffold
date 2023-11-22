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
      <Flex justifyContent='space-between' mt={5}>
        {activeStep !== steps.findIndex((step) => step.first) && (
          <Button
            variant='on-vote-ghost'
            color='primary.500'
            w='200px'
            onClick={prev}
            leftIcon={<ArrowBackIcon />}
            sx={{
              position: 'relative',
              transition: '0.3s',
              '&:hover': {
                '& span': {
                  marginLeft: '10px',
                },
                '& svg': {
                  marginLeft: '-10px',
                },
              },
            }}
          >
            <Text as='span'>{t('form.process_create.previous_step')}</Text>
          </Button>
        )}
        <Button
          w='200px'
          type='submit'
          ml='auto'
          form='process-create-form'
          rightIcon={<ArrowForwardIcon />}
          variant='on-vote'
          colorScheme='primary'
          sx={{
            position: 'relative',
            transition: '0.3s',
            '&:hover': {
              '& span': {
                marginRight: '10px',
              },
              '& svg': {
                marginRight: '-10px',
              },
            },
          }}
        >
          <Text as='span'> {t('form.process_create.next_step')}</Text>
        </Button>
      </Flex>
    </Box>
  )
}
