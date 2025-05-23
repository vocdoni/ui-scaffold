import { Alert, Box, Flex, FormControl, FormErrorMessage, FormLabel, Icon, Progress, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Select, Props as SelectProps, components } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { ControllerProps } from 'react-hook-form/dist/types'
import { useTranslation } from 'react-i18next'
import { LuEye, LuKey, LuUserRoundCog, LuUsers } from 'react-icons/lu'
import { LanguagesSlice } from '~i18n/languages.mjs'
import { useOrganizationTypes, useRoles } from '~src/queries/organization'
import { reactSelectStyles } from '~theme/reactSelectStyles'

export type SelectOptionType = {
  label: string
  value: string
}

export type CountryOptionType = SelectOptionType & {
  flag: string
}

export type RoleOptionType = SelectOptionType & {
  writePermission: boolean
}

export type SelectCustomProps = {
  name: string
  label?: string
  required?: boolean
  controller?: Omit<ControllerProps, 'render' | 'name'>
} & SelectProps

export const SelectCustom = ({
  name,
  label,
  placeholder,
  required = false,
  controller,
  ...rest
}: SelectCustomProps) => {
  const { t } = useTranslation()

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
    <FormControl isInvalid={!!errors[name]} isRequired={required}>
      {label && (
        <FormLabel htmlFor={name} display='flex' ms={1} fontSize='sm' fontWeight='500' mb={2}>
          {label}
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
            isClearable={!required}
            isRequired={false} // we don't want HTML5 validation
            {...field}
            {...rest}
            chakraStyles={reactSelectStyles}
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

export const OrganzationTypeSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useOrganizationTypes()

  if (isError) return <Alert status='error'>{error?.message || t('error.loading_types')}</Alert>

  const orgTypes: SelectOptionType[] = data.map((type: any) => ({
    label: type.name,
    value: type.type,
  }))

  return (
    <SelectCustom
      isLoading={isLoading}
      options={orgTypes}
      label={t('org_type_selector.selector_label', { defaultValue: 'Organization Type' })}
      {...props}
    />
  )
}

export const createCountryDisplay = (type: 'Option' | 'SingleValue') => {
  const BaseComponent = components[type]

  return (props: any) => {
    const { data, selectProps } = props

    const fullOption = (selectProps.options as CountryOptionType[]).find((opt) => opt.value === data.value) || data

    return (
      <BaseComponent {...props}>
        <Flex align='center' gap={2}>
          <Box as='span' role='img'>
            {fullOption.flag}
          </Box>
          <Text fontWeight='bold'>{fullOption.label}</Text>
        </Flex>
      </BaseComponent>
    )
  }
}

export const CountrySelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  // Priority countries in the desired order
  const priorityCountries = ['ES', 'FR', 'DE', 'GB', 'IT', 'US']

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await fetch('https://restcountries.com/v3.1/all')
      if (!response.ok) {
        throw new Error('Failed to fetch countries')
      }
      const data = await response.json()

      // Transform and sort the data
      const transformedCountries = data.map((country: any) => ({
        label: country.name.common,
        value: country.cca2,
        flag: country.flag,
      }))

      // Custom sort function
      return transformedCountries.sort((a: SelectOptionType, b: SelectOptionType) => {
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

  if (error) return <Alert status='error'>{error.message}</Alert>

  const defaultVal = countries.find((country: CountryOptionType) => country.value === 'ES')

  return (
    <SelectCustom
      options={countries}
      isLoading={isLoading}
      label={t('country_selector.selector_label', { defaultValue: 'Country' })}
      defaultValue={defaultVal}
      controller={{ defaultValue: defaultVal }}
      components={{ SingleValue: createCountryDisplay('SingleValue'), Option: createCountryDisplay('Option') }}
      {...props}
    />
  )
}

export const MembershipSizeSelector = ({ defaultValue, ...props }: Omit<SelectCustomProps, 'options'>) => {
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
      label={t('membership_size.selector_label', { defaultValue: 'Membership Size' })}
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

export const IssueTypeSelector = ({ defaultValue, ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()
  const listSizes: SelectOptionType[] = [
    { label: t('form.support.voting_issue', { defaultValue: 'Voting issue' }), value: 'voting-issue' },
    { label: t('form.support.billing_issue', { defaultValue: 'Billing issue' }), value: 'billing-issue' },
    { label: t('form.support.technical_issue', { defaultValue: 'Technical issue' }), value: 'technical-issue' },
  ]

  return (
    <SelectCustom
      options={listSizes}
      label={t('form.support.selector_label', { defaultValue: 'Type of Issue' })}
      {...props}
    />
  )
}

const roleIcons: Record<string, JSX.Element> = {
  Admin: <Icon as={LuKey} />,
  Manager: <Icon as={LuUserRoundCog} />,
  Viewer: <Icon as={LuEye} />,
  Any: <Icon as={LuUsers} />,
}

export const createRoleDisplay = (type: 'Option' | 'SingleValue') => {
  const BaseComponent = components[type]

  return (props: any) => {
    const { t } = useTranslation()
    const { data } = props
    const accessLabel = data.writePermission
      ? t('role.full_access', { defaultValue: '(Full access)' })
      : t('role.read_only', { defaultValue: '(Read-only)' })
    const icon = roleIcons[data.label]

    return (
      <BaseComponent {...props}>
        <Flex align='center' gap={2} alignItems='center'>
          <Box as='span' role='img'>
            {icon}
          </Box>
          <Text fontWeight='bold'>{data.label}</Text>
          <Text fontSize='sm' color='gray.500'>
            {accessLabel}
          </Text>
        </Flex>
      </BaseComponent>
    )
  }
}

export const RoleSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()
  const { data, isLoading: rolesLoading, isError: rolesError, error: rolesFetchError } = useRoles()

  if (rolesLoading) return <Progress isIndeterminate colorScheme='gray' />

  if (rolesError) return <Alert status='error'>{rolesFetchError?.message || t('error.loading_roles')}</Alert>

  const roles: SelectOptionType[] = data.map((role: any) => ({
    label: role.name,
    value: role.role,
    writePermission: role.writePermission,
  }))
  const defaultVal = roles.find((role: RoleOptionType) => role.value === 'viewer')

  return (
    <SelectCustom
      options={roles}
      label={t('role_selector.selector_label', { defaultValue: 'Role' })}
      components={{ SingleValue: createRoleDisplay('SingleValue'), Option: createRoleDisplay('Option') }}
      defaultValue={defaultVal}
      controller={{ defaultValue: defaultVal }}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 1600 }),
      }}
      {...props}
    />
  )
}
