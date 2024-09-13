import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { ChakraStylesConfig, GroupBase, Select, Props as SelectProps } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

export type SelectOptionType = {
  label: string
  value: string
}

export type SelectCustomProps = {
  name: string
  label?: string
  required?: boolean
} & SelectProps

// todo: move this to theme
const customStyles: ChakraStylesConfig<any, false, GroupBase<any>> = {
  control: (provided) => ({
    ...provided,
    borderColor: 'gray.200',
    minH: '50px',
    borderRadius: 'xl',
    _hover: {
      borderColor: 'gray.300',
    },
    _focus: {
      borderColor: 'gray.300',
      boxShadow: 'none',
      outline: '2px solid #3965FF',
      outlineOffset: '0px',
    },
  }),
}

export const SelectCustom = ({ name, label, placeholder, required = false, ...rest }: SelectCustomProps) => {
  const { t } = useTranslation()
  const { textColor } = useDarkMode()

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
        <FormLabel htmlFor={name} fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? t('form.error.field_is_required') : false }}
        render={({ field }) => (
          <Select
            placeholder={t('form.choose_an_option', { defaultValue: 'Choose an option' })}
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
      <FormErrorMessage>{getErrorMessage(errors[name])}</FormErrorMessage>
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

  const countries: SelectOptionType[] = [
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
    { label: t('country_selector.spain', { defaultValue: 'Spain' }), value: 'ES' },
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
      {...props}
    />
  )
}

export const MembershipSizeTypesSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
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
