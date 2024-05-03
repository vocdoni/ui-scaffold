import { AccountData, PlainCensus, VocdoniSDKClient } from '@vocdoni/sdk'
import chalk from 'chalk'
import { CensusSpreadsheetManager } from './spreadsheet/CensusSpreadsheetManager'

export const getCsvCensus = async (client: VocdoniSDKClient, filepath: string) => {
  console.log('Creating census from the CSV...')
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
  return { census, spreadsheet }
}
