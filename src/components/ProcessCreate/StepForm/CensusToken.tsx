import { Box, Link, Text } from '@chakra-ui/react'
import { Census3Token, ICensus3SupportedChain } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { CensusTokens } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface CensusTokenValues {
  censusToken: Census3Token
  maxCensusSize?: number
  chain: ICensus3SupportedChain
  timeToCreateCensus: number
  strategySize: number
  accuracy: number
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
      accuracy: form.accuracy,
    },
  })

  const onSubmit: SubmitHandler<CensusTokenValues> = async (data) => {
    if (await setForm({ ...form, ...data })) {
      next()
    }
  }
  return (
    <>
      <Text variant='process-create-census-title'>{t('census.token_title')}</Text>
      <Text variant='process-create-subtitle-sm' mb={6}>
        <Trans
          i18nKey='census.token_description'
          components={{
            link1: <Link href={'https://tally.so/r/mO46VY'} target='_blank' />,
          }}
        />
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusTokens />
        </Box>
      </FormProvider>
    </>
  )
}
