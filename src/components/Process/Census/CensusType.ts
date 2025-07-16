export const CensusTypeMemberbase = 'memberbase'
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

export type CensusMeta = {
  type: CensusType
  fields: string[]
}

export enum CensusTypes {
  Memberbase = CensusTypeMemberbase,
  Spreadsheet = CensusTypeSpreadsheet,
  Web3 = CensusTypeWeb3,
}
