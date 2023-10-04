import { Box, Link, Text } from '@chakra-ui/react'
import { ICensus3Token } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { CensusTokens } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface CensusTokenValues {
  censusToken: string
  maxCensusSize?: number
  token?: ICensus3Token
}

export const StepFormCensusToken = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusTokenValues>({
    defaultValues: {
      censusToken: form.censusToken,
      maxCensusSize: form.maxCensusSize,
      token: form.token,
    },
  })

  const onSubmit: SubmitHandler<CensusTokenValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }
  return (
    <Box px={7} py={4}>
      <Text fontWeight='bold' mb={3} color='process_create.census.title'>
        {t('census.token_title')}
      </Text>
      <Text fontSize='sm' color='process_create.description' mb={5}>
        <Trans
          i18nKey='census.token_description'
          components={{
            customLink: <Link variant='primary' href='https://tally.so/r/mO46VY' target='_blank' />,
          }}
        />
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusTokens />
        </Box>
      </FormProvider>
    </Box>
  )
}
