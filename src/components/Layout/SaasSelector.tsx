import { useTranslation } from 'react-i18next'
import SelectCustom, { SelectCustomProps } from '~components/OrganizationSaas/Dashboard/SelectCustom'

export const OrganzationTypesSelector = ({ ...props }: Omit<SelectCustomProps, 'options'>) => {
  const { t } = useTranslation()

  const orgTypes = [
    { label: t('org_type_selector.assembly'), value: 'assembly' },
    { label: t('org_type_selector.association'), value: 'association' },
    { label: t('org_type_selector.chamber'), value: 'chamber' },
    { label: t('org_type_selector.church'), value: 'church' },
    { label: t('org_type_selector.city'), value: 'city_municipality' },
    { label: t('org_type_selector.company'), value: 'company' },
    { label: t('org_type_selector.cooperative'), value: 'cooperative' },
    { label: t('org_type_selector.party'), value: 'party' },
    { label: t('org_type_selector.university'), value: 'university' },
    { label: t('org_type_selector.union'), value: 'union' },
    { label: t('org_type_selector.others'), value: 'others' },
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

  const countries = [
    { label: t('country_selector.australia'), value: 'AU' },
    { label: t('country_selector.brazil'), value: 'BR' },
    { label: t('country_selector.canada'), value: 'CA' },
    { label: t('country_selector.china'), value: 'CN' },
    { label: t('country_selector.france'), value: 'FR' },
    { label: t('country_selector.germany'), value: 'DE' },
    { label: t('country_selector.india'), value: 'IN' },
    { label: t('country_selector.italy'), value: 'IT' },
    { label: t('country_selector.japan'), value: 'JP' },
    { label: t('country_selector.mexico'), value: 'MX' },
    { label: t('country_selector.netherlands'), value: 'NL' },
    { label: t('country_selector.new_zealand'), value: 'NZ' },
    { label: t('country_selector.russia'), value: 'RU' },
    { label: t('country_selector.south_africa'), value: 'ZA' },
    { label: t('country_selector.south_korea'), value: 'KR' },
    { label: t('country_selector.spain'), value: 'ES' },
    { label: t('country_selector.sweden'), value: 'SE' },
    { label: t('country_selector.switzerland'), value: 'CH' },
    { label: t('country_selector.united_kingdom'), value: 'GB' },
    { label: t('country_selector.united_states'), value: 'US' },
    { label: t('country_selector.other'), value: 'OT' },
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
  const listSizes = [
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
