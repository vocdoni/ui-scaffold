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
import { CspCensus, GitcoinCensus, SpreadsheetCensus, TokenCensus, Web3Census } from '../StepForm/Censuses'
import { GenericFeatureObject } from '~components/ProcessCreate/Steps/TabsPage'

export const useCensusTypes = (): GenericFeatureObject<CensusType> => {
  const { t } = useTranslation()

  return {
    list: CensusTypes,
    defined: import.meta.env.features.census as CensusType[],
    details: {
      [CensusTypeSpreadsheet]: {
        title: t('form.process_create.census.spreadsheet_title'),
        description: t('form.process_create.census.spreadsheet_description'),
        icon: BiFile,
        component: SpreadsheetCensus,
      },
      [CensusTypeToken]: {
        title: t('form.process_create.census.token_base_title'),
        description: t('form.process_create.census.token_base_description'),
        icon: BiCoinStack,
        component: TokenCensus,
      },
      [CensusTypeWeb3]: {
        title: t('form.process_create.census.wallet_address_title'),
        description: t('form.process_create.census.wallet_address_description'),
        icon: BiWallet,
        component: Web3Census,
      },
      [CensusTypeCsp]: {
        title: t('form.process_create.census.social_title'),
        description: t('form.process_create.census.social_description'),
        icon: BiGroup,
        component: CspCensus,
      },
      [CensusTypeGitcoin]: {
        title: t('form.process_create.census.gitcoin_title'),
        description: t('form.process_create.census.gitcoin_description'),
        icon: BiWallet,
        component: GitcoinCensus,
      },
    },
  }
}
