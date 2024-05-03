import { ElectionStatus, OffchainCensus, UnpublishedElection, VocdoniSDKClient } from '@vocdoni/sdk'
import chalk from 'chalk'
import { getCsvCensus } from './census'
import path from 'path'

export const publishElection = async (election: UnpublishedElection, client: VocdoniSDKClient) => {
  console.log(chalk.yellow('Creating a new voting process!'))

  if (!client) throw new Error('Missing client')

  let electionIdentifier: string

  return await client
    .createElection(election)
    .then((electionId) => {
      client.setElectionId(electionId)
      console.log(chalk.green('Election created!'), chalk.blue(electionId))
    })
    .then(() => {
      return client.fetchElection()
    })
}

export async function createElection(
  vocdoniClient: VocdoniSDKClient,
  createElectionFunction: (census: OffchainCensus) => UnpublishedElection
) {
  const { census, spreadsheet } = await getCsvCensus(vocdoniClient, path.join(__dirname, '../census.csv'))

  console.log('Creating election...')
  const election = createElectionFunction(census)

  console.log('Publishing election...')
  return await publishElection(election, vocdoniClient)
}
