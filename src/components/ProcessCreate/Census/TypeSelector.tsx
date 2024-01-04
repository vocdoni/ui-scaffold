import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiWallet } from 'react-icons/bi'
import { SpreadsheetCensus, TokenCensus, Web3Census } from '../StepForm/Censuses'

export const CensusTypeSpreadsheet = 'spreadsheet'
export const CensusTypeToken = 'token'
export const CensusTypeWeb3 = 'web3'
export type CensusType = typeof CensusTypeWeb3 | typeof CensusTypeSpreadsheet | typeof CensusTypeToken
export const CensusTypes = [
  CensusTypeSpreadsheet as CensusType,
  CensusTypeToken as CensusType,
  CensusTypeWeb3 as CensusType,
]

export const useCensusTypes = () => {
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
    },
  }
}
