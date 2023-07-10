import { Box, Text } from '@chakra-ui/react'
import { ICensus3Token } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusTokens } from '../Census/Token'
import { useProcessCreationSteps } from './use-steps'

export interface CensusTokenValues {
  censusToken: string
  maxCensusSize?: number
  token?: ICensus3Token
}

export const StepsCensusToken = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusTokenValues>({
    defaultValues: {
      censusToken: form.censusToken,
      maxCensusSize: form.maxCensusSize,
    },
  })

  const onSubmit: SubmitHandler<CensusTokenValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }
  return (
    <>
      <Box mb={5}>
        <Text fontWeight='bold' fontSize='xl2' textAlign='center' mb={3}>
          {t('form.process_create.census.token_title')}
        </Text>
      </Box>

      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusTokens />
        </Box>
      </FormProvider>
    </>
  )
}
