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

interface IGitcoinFormProps {
  gitcoinTokens: GitcoinStampToken[]
}

export const GitcoinForm: FC<IGitcoinFormProps> = ({ gitcoinTokens }) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <>
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
          <StampCard key={i} name={token.name} stampId={token.externalID} />
        ))}
      </Grid>
      <StampsUnionType />
    </>
  )
}
