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
        <Button
          onClick={prev}
          leftIcon={<ArrowBackIcon />}
          colorScheme='process_create.btn_white'
          borderRadius='md'
          boxShadow='0px 2px 4px gray'
          width={36}
          fontWeight={600}
          fontSize='md'
          color='black'
          _hover={{
            fontSize: 'lg',
          }}
          _active={{
            fontSize: 'md',
          }}
        >
          {t('form.process_create.previous_step')}
        </Button>
      )}
      <Button
        form='process-create-form'
        rightIcon={<ArrowForwardIcon />}
        type='submit'
        ml='auto'
        colorScheme='process_create.btn_vcd'
        borderRadius='md'
        boxShadow='0px 2px 4px gray'
        width={36}
        fontWeight={600}
        fontSize='md'
        _hover={{
          fontSize: 'lg',
        }}
        _active={{
          fontSize: 'md',
        }}
      >
        {t('form.process_create.next_step')}
      </Button>
    </Flex>
  )
}
