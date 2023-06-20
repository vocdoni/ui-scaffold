import { FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CensusTypeWeb3 = 'web3'
export const CensusTypeCSV = 'csv'
export type CensusType = typeof CensusTypeWeb3 | typeof CensusTypeCSV | null
export const CensusTypes = [CensusTypeWeb3 as CensusType, CensusTypeCSV as CensusType]

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
