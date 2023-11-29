import { Box, Text } from '@chakra-ui/react'
import { Census3Token, ICensus3SupportedChain } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusTokens } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface CensusTokenValues {
  censusToken: Census3Token
  maxCensusSize?: number
  chain: ICensus3SupportedChain
  strategySize: number
}

export const StepFormCensusToken = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusTokenValues>({
    defaultValues: {
      censusToken: form.censusToken,
      maxCensusSize: form.maxCensusSize,
      chain: form.chain,
      strategySize: form.strategySize,
    },
  })

  const onSubmit: SubmitHandler<CensusTokenValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }
  return (
    <Box px={7} py={4}>
      <Text
        fontWeight='bold'
        mb={3}
        fontFamily='pixeloidsans'
        textTransform='uppercase'
        color='process_create.census.title'
      >
        {t('census.token_title')}
      </Text>
      <Text fontSize='sm' color='process_create.description' mb={5}>
        {t('census.token_description')}
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusTokens />
        </Box>
      </FormProvider>
    </Box>
  )
}
