import { FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { ChakraStylesConfig, GroupBase, Props as SelectProps, Select } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { ControllerProps } from 'react-hook-form/dist/types'
import { useTranslation } from 'react-i18next'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { LanguagesSlice } from '~i18n/languages.mjs'

export type SelectOptionType = {
  label: string
  value: string
}

export type SelectCustomProps = {
  name: string
  label?: string
  required?: boolean
  controller?: Omit<ControllerProps, 'render' | 'name'>
} & SelectProps

// todo: move this to theme
const customStyles: ChakraStylesConfig<any, false, GroupBase<any>> = {
  control: (provided, state) => ({
    ...provided,
    minH: '50px',
    borderRadius: 'xl',
    borderColor: state.isFocused ? 'blue.500' : 'secondaryGray.100',
    boxShadow: 'none',
    _hover: {
      borderColor: 'gray.300',
    },
    _focus: {
      borderColor: 'blue.500',
      boxShadow: 'none',
      outline: '1px solid #3965FF',
      outlineOffset: '0px',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.300',
  }),
}

export const SelectCustom = ({
  name,
  label,
  placeholder,
  required = false,
  controller,
  ...rest
}: SelectCustomProps) => {
  const { t } = useTranslation()
  const { textColor, textColorBrand } = useDarkMode()

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext()

  // Function to extract and format error messages
  const getErrorMessage = (error: any): string => {
    if (error && typeof error.message === 'string') {
      return error.message
    }
    return 'An error occurred'
  }

  return (
    <FormControl isInvalid={!!errors[name]}>
      {label && (
        <FormLabel htmlFor={name} display='flex' ms={1} fontSize='sm' fontWeight='500' color={textColor} mb={2}>
          {label}
          {required && (
            <Text color={textColorBrand} ml={1}>
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Controller
        {...controller}
        name={name}
        control={control}
        rules={{ required: required ? t('form.error.field_is_required') : false }}
        render={({ field }) => (
          <Select
            placeholder={t('form.choose_an_option', { defaultValue: 'Choose an option' })}
            getOptionLabel={(option: SelectOptionType) => {
              // If no label is set for the current option, find the corresponding label in the options array
              // This allows setting the value directly in form defaults without needing to know the label
              if (!option?.label) {
                const foundOption = (rest.options as SelectOptionType[]).find((opt) => opt?.value === option?.value)
                return foundOption?.label || option.value
              }
              return option.label
            }}
            {...field}
            {...rest}
            chakraStyles={customStyles}
            isClearable
            onChange={(selectedOption) => {
              setValue(name, selectedOption)
            }}
          />
        )}
      />
      <FormErrorMessage mt={2}>{getErrorMessage(errors[name]) || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export const OrganzationTypesSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  const orgTypes: SelectOptionType[] = [
    { label: t('org_type_selector.assembly', { defaultValue: 'Assembly' }), value: 'assembly' },
    { label: t('org_type_selector.association', { defaultValue: 'Association' }), value: 'association' },
    { label: t('org_type_selector.chamber', { defaultValue: 'Chamber' }), value: 'chamber' },
    { label: t('org_type_selector.church', { defaultValue: 'Church' }), value: 'church' },
    { label: t('org_type_selector.city', { defaultValue: 'City/Municipality' }), value: 'city_municipality' },
    { label: t('org_type_selector.company', { defaultValue: 'Company' }), value: 'company' },
    { label: t('org_type_selector.cooperative', { defaultValue: 'Cooperative' }), value: 'cooperative' },
    { label: t('org_type_selector.party', { defaultValue: 'Party' }), value: 'party' },
    { label: t('org_type_selector.university', { defaultValue: 'University' }), value: 'university' },
    { label: t('org_type_selector.union', { defaultValue: 'Union' }), value: 'union' },
    { label: t('org_type_selector.others', { defaultValue: 'Others' }), value: 'others' },
  ]

  return (
    <SelectCustom
      options={orgTypes}
      label={t('org_type_selector.selector_label', { defaultValue: 'Select Organization Type' })}
      {...props}
    />
  )
}

export const CountriesTypesSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  const defaultVal = { label: t('country_selector.spain', { defaultValue: 'Spain' }), value: 'ES' }

  const countries: SelectOptionType[] = [
    defaultVal,
    { label: t('country_selector.australia', { defaultValue: 'Australia' }), value: 'AU' },
    { label: t('country_selector.brazil', { defaultValue: 'Brazil' }), value: 'BR' },
    { label: t('country_selector.canada', { defaultValue: 'Canada' }), value: 'CA' },
    { label: t('country_selector.china', { defaultValue: 'China' }), value: 'CN' },
    { label: t('country_selector.france', { defaultValue: 'France' }), value: 'FR' },
    { label: t('country_selector.germany', { defaultValue: 'Germany' }), value: 'DE' },
    { label: t('country_selector.india', { defaultValue: 'India' }), value: 'IN' },
    { label: t('country_selector.italy', { defaultValue: 'Italy' }), value: 'IT' },
    { label: t('country_selector.japan', { defaultValue: 'Japan' }), value: 'JP' },
    { label: t('country_selector.mexico', { defaultValue: 'Mexico' }), value: 'MX' },
    { label: t('country_selector.netherlands', { defaultValue: 'Netherlands' }), value: 'NL' },
    { label: t('country_selector.new_zealand', { defaultValue: 'New Zealand' }), value: 'NZ' },
    { label: t('country_selector.russia', { defaultValue: 'Russia' }), value: 'RU' },
    { label: t('country_selector.south_africa', { defaultValue: 'South Africa' }), value: 'ZA' },
    { label: t('country_selector.south_korea', { defaultValue: 'South Korea' }), value: 'KR' },
    { label: t('country_selector.sweden', { defaultValue: 'Sweden' }), value: 'SE' },
    { label: t('country_selector.switzerland', { defaultValue: 'Switzerland' }), value: 'CH' },
    { label: t('country_selector.united_kingdom', { defaultValue: 'United Kingdom' }), value: 'GB' },
    { label: t('country_selector.united_states', { defaultValue: 'United States' }), value: 'US' },
    { label: t('country_selector.other', { defaultValue: 'Other' }), value: 'OT' },
  ]
  return (
    <SelectCustom
      options={countries}
      label={t('country_selector.selector_label', { defaultValue: 'Country' })}
      defaultValue={defaultVal}
      controller={{ defaultValue: defaultVal }}
      {...props}
    />
  )
}

export const MembershipSizeTypesSelector = ({ defaultValue, ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()
  const listSizes: SelectOptionType[] = [
    { label: '0-100', value: '0-100' },
    { label: '100-250', value: '100-250' },
    { label: '250-500', value: '250-500' },
    { label: '500-1K', value: '500-1K' },
    { label: '1K-5K', value: '1K-5K' },
    { label: '5K-10K', value: '5K-10K' },
    { label: '+10K', value: '10K+' },
  ]

  return (
    <SelectCustom
      options={listSizes}
      label={t('membership_size.selector_label', { defaultValue: 'Membership size' })}
      {...props}
    />
  )
}

export const CustomizationTimeZoneSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  const timezones: SelectOptionType[] = [
    { label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
    { label: '(UTC-11:00) Coordinated Universal Time-11', value: 'Etc/GMT+11' },
    { label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
    { label: '(UTC-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
    { label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
    { label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
    { label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
    { label: '(UTC-03:00) Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
    { label: '(UTC+00:00) London, Lisbon, Dublin', value: 'Europe/London' },
    { label: '(UTC+01:00) Central European Time', value: 'Europe/Berlin' },
    { label: '(UTC+02:00) Eastern European Time', value: 'Europe/Istanbul' },
    { label: '(UTC+03:00) Moscow, Saint Petersburg', value: 'Europe/Moscow' },
    { label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: 'Asia/Kolkata' },
    { label: '(UTC+08:00) Beijing, Singapore, Hong Kong', value: 'Asia/Shanghai' },
    { label: '(UTC+09:00) Tokyo, Seoul', value: 'Asia/Tokyo' },
    { label: '(UTC+10:00) Sydney, Melbourne, Brisbane', value: 'Australia/Sydney' },
  ]

  return (
    <SelectCustom options={timezones} label={t('membership_size.timezone', { defaultValue: 'Timezone' })} {...props} />
  )
}

export const CustomizationLanguageSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  const languages: SelectOptionType[] = Object.entries(LanguagesSlice as { [key: string]: string }).map(
    ([key, val]) => {
      return { label: val, value: key }
    }
  )

  return (
    <SelectCustom
      options={languages}
      label={t('membership_size.language', { defaultValue: 'Default Language' })}
      {...props}
    />
  )
}
