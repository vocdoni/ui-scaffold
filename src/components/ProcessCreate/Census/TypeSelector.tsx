import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiWallet } from 'react-icons/bi'
import { StepFormCensusSpreadsheet } from '../StepForm/CensusSpreadsheetOnVote'
import { StepFormCensusToken } from '../StepForm/CensusTokenOnVote'
import { StepFormCensusWeb3 } from '../StepForm/CensusWeb3OnVote'

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
    },
  }
}
