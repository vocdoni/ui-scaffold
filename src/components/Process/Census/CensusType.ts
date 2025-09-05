export const CensusTypeSpreadsheet = 'spreadsheet'
export const CensusTypeWeb3 = 'web3'
export const CensusTypeCsp = 'csp'
export type CensusType = typeof CensusTypeWeb3 | typeof CensusTypeSpreadsheet | typeof CensusTypeCsp

export type CensusMeta = {
  type: CensusType
  fields: string[]
}

export enum CensusTypes {
  Spreadsheet = CensusTypeSpreadsheet,
  Web3 = CensusTypeWeb3,
  CSP = CensusTypeCsp,
}

export const CensusTypeValues = [CensusTypes.CSP, CensusTypes.Spreadsheet, CensusTypes.Web3] as const
