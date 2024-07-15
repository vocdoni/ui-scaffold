export const CensusTypeSpreadsheet = 'spreadsheet'
export const CensusTypeToken = 'token'
export const CensusTypeWeb3 = 'web3'
export const CensusTypeCsp = 'csp'
export const CensusTypeGitcoin = 'gitcoin'
export type CensusType =
  | typeof CensusTypeWeb3
  | typeof CensusTypeSpreadsheet
  | typeof CensusTypeToken
  | typeof CensusTypeCsp
  | typeof CensusTypeGitcoin
export const CensusTypes = [
  CensusTypeSpreadsheet as CensusType,
  CensusTypeToken as CensusType,
  CensusTypeWeb3 as CensusType,
  CensusTypeCsp as CensusType,
  CensusTypeGitcoin as CensusType,
]

export type CensusMeta = {
  type: CensusType
  fields: string[]
}
