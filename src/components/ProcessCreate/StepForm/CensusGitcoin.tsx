import { Box, Link, Text } from '@chakra-ui/react'
import { Census3Token } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { StampsUnionTypes } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'
import { CensusTokenValues } from '~components/ProcessCreate/StepForm/CensusToken'
import { GitcoinStampToken, GitcoinStrategyBuilder } from '../Census/Gitcoin'
import { useProcessCreationSteps } from '../Steps/use-steps'

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
    <>
      <Text fontWeight={'bold'}>{t('census.gitcoin_title')}</Text>
      <Text mb={6}>
        {t('census.gitcoin_description')} <br />
        <Trans
          i18nKey='census.gitcoin_read_more'
          components={{
            a: (
              <Link
                href={'https://docs.passport.gitcoin.co/building-with-passport/major-concepts/scoring-thresholds'}
                target='_blank'
                textDecoration='underline'
                _hover={{
                  textDecoration: 'none',
                }}
              />
            ),
          }}
        />
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <GitcoinStrategyBuilder />
        </Box>
      </FormProvider>
    </>
  )
}
