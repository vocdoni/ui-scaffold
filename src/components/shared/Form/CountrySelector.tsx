import { Alert, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { GroupBase, Props } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Select } from './Select'

type OptionType = {
  label: string
  value: string
}

type SelectProps = Props<OptionType, false, GroupBase<OptionType>>

type RestCountry = {
  name: {
    common: string
    official: string
  }
  cca2: string
  flag: string
}

export type CountryOptionType = OptionType & {
  flag: string
}

export const CountrySelector = ({ ...props }: Omit<SelectProps, 'options'>) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext()

  // Priority countries in the desired order
  const priorityCountries = ['ES', 'FR', 'DE', 'GB', 'IT', 'US']

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<CountryOptionType[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,cca2')
      if (!response.ok) {
        throw new Error('Failed to fetch countries')
      }
      const data = (await response.json()) as RestCountry[]

      // Transform and sort the data
      const transformedCountries = data.map((country) => ({
        label: country.name.common,
        value: country.cca2,
        flag: country.flag,
      }))

      // Custom sort function
      return transformedCountries.sort((a: CountryOptionType, b: CountryOptionType) => {
        const aIndex = priorityCountries.indexOf(a.value)
        const bIndex = priorityCountries.indexOf(b.value)

        // If both countries are priority countries, sort by priority order
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex
        }

        // If only a is a priority country, it comes first
        if (aIndex !== -1) return -1
        // If only b is a priority country, it comes first
        if (bIndex !== -1) return 1

        // For non-priority countries, sort alphabetically
        return a.label.localeCompare(b.label)
      })
    },
    staleTime: Infinity, // Countries list won't change often
  })

  // If there's an error fetching countries, display an alert

  if (error) return <Alert status='error'>{error.message}</Alert>

  return (
    <FormControl isInvalid={!!errors?.country} isRequired={true}>
      <FormLabel htmlFor='country'>
        <Trans i18nKey='country_selector.selector_label'>Country</Trans>
      </FormLabel>
      <Controller
        name='country'
        control={control}
        rules={{ required: t('form.error.field_is_required') }}
        render={({ field }) => (
          <Select
            options={data}
            isLoading={isLoading}
            value={data.find((opt) => opt.value === field.value)}
            getOptionLabel={(option) => `${(option as CountryOptionType).flag} ${option.label}`}
            onChange={(selectedOption) => {
              setValue('country', selectedOption)
            }}
            isClearable={false}
            {...props}
            isRequired={false} // we don't want HTML5 validation
          />
        )}
      />
      <FormErrorMessage mt={2}>{errors?.country?.message.toString()}</FormErrorMessage>
    </FormControl>
  )
}
