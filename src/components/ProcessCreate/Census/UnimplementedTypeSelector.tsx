import { useTranslation } from 'react-i18next'
import { BiPhone } from 'react-icons/bi'

export const CensusTypePhone = 'phone'
export const CensusTypeEmail = 'email'
export const CensusTypeCrm = 'crm'
export const CensusTypeDatabase = 'database'
export const CensusTypeDigitalCerificate = 'digital_certificate'
export const CensusTypeOthers = 'others'

export type UnimplementedCensusType =
  | typeof CensusTypePhone
  | typeof CensusTypeEmail
  | typeof CensusTypeCrm
  | typeof CensusTypeDatabase
  | typeof CensusTypeDigitalCerificate
  | typeof CensusTypeOthers

export const UnimplementedCensusTypes = [
  CensusTypePhone as UnimplementedCensusType,
  CensusTypeEmail as UnimplementedCensusType,
  CensusTypeCrm as UnimplementedCensusType,
  CensusTypeDatabase as UnimplementedCensusType,
  CensusTypeDigitalCerificate as UnimplementedCensusType,
  CensusTypeOthers as UnimplementedCensusType,
]

export const useUnimplementedCensusTypes = () => {
  const { t } = useTranslation()
  return {
    list: UnimplementedCensusTypes,
    defined: import.meta.env.features.unimplemented_census as UnimplementedCensusType[],
    details: {
      [CensusTypePhone]: {
        title: t('process_create.census.phone_title'),
        description: t('process_create.census.phone_description'),
        icon: BiPhone,
      },
      [CensusTypeEmail]: {
        title: t('process_create.census.email_title'),
        description: t('process_create.census.email_description'),
        icon: BiPhone,
      },
      [CensusTypeCrm]: {
        title: t('process_create.census.crm_title'),
        description: t('process_create.census.crm_description'),
        icon: BiPhone,
      },
      [CensusTypeDatabase]: {
        title: t('process_create.census.database_title'),
        description: t('process_create.census.database_description'),
        icon: BiPhone,
      },
      [CensusTypeDigitalCerificate]: {
        title: t('process_create.census.digital_certificate_title'),
        description: t('process_create.census.digital_certificate_description'),
        icon: BiPhone,
      },
      [CensusTypeOthers]: {
        title: t('process_create.census.others_title'),
        description: t('process_create.census.others_description'),
        icon: BiPhone,
      },
    },
  }
}
