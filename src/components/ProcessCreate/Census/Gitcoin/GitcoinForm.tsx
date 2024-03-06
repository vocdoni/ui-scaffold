import {
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Grid,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { StampCard } from '~components/ProcessCreate/Census/Gitcoin/StampCard'
import { GitcoinStampToken } from '~components/ProcessCreate/Census/Gitcoin/index'
import { StampsUnionType } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'
import { MaxCensusSizeSelector } from '~components/ProcessCreate/Census/Token'
import { Census3Token } from '@vocdoni/sdk'

interface IGitcoinFormProps {
  gitcoinTokens: GitcoinStampToken[]
}

export const GitcoinForm: FC<IGitcoinFormProps> = ({ gitcoinTokens }) => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const ct: Census3Token = watch('censusToken')
  const strategySize: number = watch('strategySize')

  return (
    <>
      <MaxCensusSizeSelector token={ct} strategySize={strategySize} />
      <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_passport_score')}</FormLabel>
      <Controller
        name={'passportScore'}
        control={control}
        defaultValue={50}
        rules={{
          required,
        }}
        render={({ field: { ref, onChange, ...restField } }) => (
          <NumberInput
            defaultValue={50}
            min={1}
            max={100}
            maxW={40}
            {...restField}
            onChange={(e) => {
              onChange(Number(e))
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      ></Controller>
      <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_stamps')}</FormLabel>
      <Grid
        gap={5}
        templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        justifyContent='space-between'
      >
        {gitcoinTokens.map((token, i) => (
          <StampCard key={i} name={token.name} token={token} />
        ))}
      </Grid>
      <StampsUnionType />
    </>
  )
}
