import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiGroup, BiWallet } from 'react-icons/bi'
import {
  CensusType,
  CensusTypeCsp,
  CensusTypeGitcoin,
  CensusTypes,
  CensusTypeSpreadsheet,
  CensusTypeToken,
  CensusTypeWeb3,
} from '~components/Process/Census/CensusType'
import { GenericFeatureObject } from '~components/ProcessCreate/Steps/TabsPage'
import { StepFormCensusCsp } from '../StepForm/CensusCsp'
import { StepFormCensusGitcoin } from '../StepForm/CensusGitcoin'
import { StepFormCensusSpreadsheet } from '../StepForm/CensusSpreadsheet'
import { StepFormCensusToken } from '../StepForm/CensusToken'
import { StepFormCensusWeb3 } from '../StepForm/CensusWeb3'

export const useCensusTypes = (): GenericFeatureObject<CensusType> => {
  const { t } = useTranslation()

  return {
    defined: CensusTypes,
    details: {
      [CensusTypeSpreadsheet]: {
        title: t('form.process_create.census.spreadsheet_title'),
        description: t('form.process_create.census.spreadsheet_description'),
        icon: BiFile,
        component: StepFormCensusSpreadsheet,
      },
      [CensusTypeToken]: {
        title: t('form.process_create.census.token_base_title'),
        description: t('form.process_create.census.token_base_description'),
        icon: BiCoinStack,
        component: StepFormCensusToken,
      },
      [CensusTypeWeb3]: {
        title: t('form.process_create.census.wallet_address_title'),
        description: t('form.process_create.census.wallet_address_description'),
        icon: BiWallet,
        component: StepFormCensusWeb3,
      },
      [CensusTypeCsp]: {
        title: t('form.process_create.census.social_title'),
        description: t('form.process_create.census.social_description'),
        icon: BiGroup,
        component: StepFormCensusCsp,
      },
      [CensusTypeGitcoin]: {
        title: t('form.process_create.census.gitcoin_title'),
        description: t('form.process_create.census.gitcoin_description'),
        icon: BiWallet,
        component: StepFormCensusGitcoin,
      },
    },
  }
}
