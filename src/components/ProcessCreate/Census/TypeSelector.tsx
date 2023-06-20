import { FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiWallet } from 'react-icons/bi'

export const CensusTypeCSV = 'csv'
export const CensusTypeToken = 'token'
export const CensusTypeWeb3 = 'web3'
export type CensusType = typeof CensusTypeWeb3 | typeof CensusTypeCSV | typeof CensusTypeToken
export const CensusTypes = [CensusTypeCSV as CensusType, CensusTypeToken as CensusType, CensusTypeWeb3 as CensusType]

export const useCensusTypes = () => {
  const { t } = useTranslation()

  return {
    list: CensusTypes,
    details: {
      [CensusTypeCSV]: {
        title: t('form.process_create.census.csv_title'),
        description: t('form.process_create.census.csv_description'),
        icon: BiFile,
      },
      [CensusTypeToken]: {
        title: t('form.process_create.census.token_base_title'),
        description: t('form.process_create.census.token_base_description'),
        icon: BiCoinStack,
      },
      [CensusTypeWeb3]: {
        title: t('form.process_create.census.wallet_address_title'),
        description: t('form.process_create.census.wallet_address_description'),
        icon: BiWallet,
      },
    },
  }
}

const CensusTypeSelector = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext()
  const { t } = useTranslation()

  const types = [
    {
      label: t('census_type.web3'),
      value: 'web3',
    },
  ]

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <FormControl mb={4} isInvalid={!!errors.censusType} isRequired>
      <RadioGroup defaultValue={getValues('censusType')}>
        <Stack spacing={5} direction='row'>
          {types.map((t, i) => (
            <Radio key={i} colorScheme='red' value={t.value} {...register('censusType', { required })}>
              {t.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{errors.censusType?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export default CensusTypeSelector
