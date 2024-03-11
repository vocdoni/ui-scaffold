import { Box, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'
import { CensusTokenValues } from '~components/ProcessCreate/StepForm/CensusToken'
import { GitcoinStampToken, GitcoinStrategyBuilder } from '../Census/Gitcoin'
import { StampsUnionTypes } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'
import { Census3Token } from '@vocdoni/sdk'

type FormGitcoinStamps = Record<string, GitcoinStampToken & { isChecked: boolean }>

export type CensusGitcoinValues = {
  gitcoinGPSToken: Census3Token
  passportScore: number
  stamps: FormGitcoinStamps
  stampsUnionType: StampsUnionTypes
  gpsWeighted: boolean
} & Omit<CensusTokenValues, 'accuracy' | 'censusToken'>

export const StepFormCensusGitcoin = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusGitcoinValues>({
    defaultValues: {
      gitcoinGPSToken: form.gitcoinGPSToken,
      maxCensusSize: form.maxCensusSize,
      strategySize: form.strategySize,
      chain: form.chain,
      passportScore: form.passportScore,
      stamps: form.stamps,
      stampsUnionType: form.stampsUnionType,
      gpsWeighted: form.gpsWeighted,
    },
  })

  const onSubmit: SubmitHandler<CensusGitcoinValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }
  return (
    <Box px={7} py={4}>
      <Text mb={3} className='brand-theme' textTransform='uppercase' color='process_create.census.title'>
        {t('census.gitcoin_title')}
      </Text>
      <Text fontSize='sm' color='process_create.description' mb={5}>
        {t('census.gitcoin_description')}
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <GitcoinStrategyBuilder />
        </Box>
      </FormProvider>
    </Box>
  )
}
