import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiWallet } from 'react-icons/bi'
import { StepsCensusCSV } from '../Steps/CensusCsv'
import { StepsCensusToken } from '../Steps/CensusToken'
import { StepsCensusWeb3 } from '../Steps/CensusWeb3'

export const CensusTypeCSV = 'csv'
export const CensusTypeToken = 'token'
export const CensusTypeWeb3 = 'web3'
export type CensusType = typeof CensusTypeWeb3 | typeof CensusTypeCSV | typeof CensusTypeToken
export const CensusTypes = [
  /* CensusTypeCSV as CensusType,  */ CensusTypeToken as CensusType,
  CensusTypeWeb3 as CensusType,
]

export const useCensusTypes = () => {
  const { t } = useTranslation()

  return {
    list: CensusTypes,
    details: {
      [CensusTypeCSV]: {
        title: t('form.process_create.census.csv_title'),
        description: t('form.process_create.census.csv_description'),
        icon: BiFile,
        component: StepsCensusCSV,
      },
      [CensusTypeToken]: {
        title: t('form.process_create.census.token_base_title'),
        description: t('form.process_create.census.token_base_description'),
        icon: BiCoinStack,
        component: StepsCensusToken,
      },
      [CensusTypeWeb3]: {
        title: t('form.process_create.census.wallet_address_title'),
        description: t('form.process_create.census.wallet_address_description'),
        icon: BiWallet,
        component: StepsCensusWeb3,
      },
    },
  }
}
