import { AccountData, Census, CspCensus, PlainCensus, VocdoniSDKClient } from '@vocdoni/sdk'
import chalk from 'chalk'
import { CensusSpreadsheetManager } from './spreadsheet/CensusSpreadsheetManager'
import path from 'path'

const CSV_PATH = process.env.CSV_PATH ?? 'census.csv'
const CSP_URL = process.env.BLINDCSP_URL ?? 'https://csp-dev-simplemath.vocdoni.net/v1'
const CSP_PUBKEY = process.env.BLINDCSP_PUBKEY ?? '025de8cb8de1005aa939c1403e37e1fa165ebc758da49cb37215c6237d01591104'

export const CensusTypeSpreadsheet = 'spreadsheet'
export const CensusTypeCsp = 'csp'

const SupportedCensusTypes = [CensusTypeCsp, CensusTypeSpreadsheet] as const

export type SupportedCensusType = (typeof SupportedCensusTypes)[number]

export const getCensus = async (censusType: SupportedCensusType, client: VocdoniSDKClient) => {
  switch (censusType) {
    case 'spreadsheet':
      return await getCsvCensus(client)
    case 'csp':
    default:
      return await getCspCensus(client)
  }
}

type CreateCensusFunctionType = (client: VocdoniSDKClient) => Promise<Census>

const getCsvCensus: CreateCensusFunctionType = async (client: VocdoniSDKClient) => {
  const filepath = path.join(__dirname, CSV_PATH)
  console.log(`Creating census from the CSV: ${filepath}`)
  const spreadsheet = new CensusSpreadsheetManager(filepath, true, false)
  spreadsheet.read()
  spreadsheet.validateDataIntegrity()
  if (spreadsheet.errors.length > 0) {
    console.log(chalk.red('Invalid Census file: ', spreadsheet.errors))
    throw new Error('Invalid Census file')
  }

  const account = (await client.fetchAccount()) as AccountData
  const salt = await client.electionService.getElectionSalt(account!.address, account!.electionIndex)

  const generated = await spreadsheet?.generateWallets(salt)
  const participants = generated!.map((row) => row.wallet)

  const census = new PlainCensus()
  census.add(participants.map((participant, index) => participant.address))
  return census
}

const getCspCensus: CreateCensusFunctionType = async (client: VocdoniSDKClient) => {
  console.log(`Creating census CSP census: ${CSP_URL} ${CSP_PUBKEY}`)
  return new CspCensus(CSP_PUBKEY, CSP_URL)
}
