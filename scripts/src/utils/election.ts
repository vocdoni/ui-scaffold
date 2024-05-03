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
      console.log('Waiting a bit to ensure we can vote...')
      client.setElectionId(electionId)
      electionIdentifier = electionId
      return waitForElectionReady(client, electionId)
    })
    .then(() => {
      console.log(chalk.green('Election ready!'))
      return client.fetchElection()
    })
}

export const waitForElectionReady = (
  client: VocdoniSDKClient,
  electionId: string,
  {
    delayTimeout = 5000,
    abortController = new AbortController(),
  }: { delayTimeout?: number; abortController?: AbortController } = {}
): Promise<void> => {
  const signal = abortController.signal

  const delay = (timeout: number): Promise<void> =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => resolve(), timeout)
      signal.addEventListener('abort', () => {
        clearTimeout(id)
        reject(new Error('Aborted'))
      })
    })

  return delay(delayTimeout)
    .then(() => {
      if (signal.aborted) {
        throw new Error('Aborted')
      }
      return client.fetchElection(electionId)
    })
    .then((election) => {
      if (signal.aborted) {
        throw new Error('Aborted')
      }
      if (election.status !== ElectionStatus.ONGOING) {
        return waitForElectionReady(client, electionId, {
          delayTimeout,
          abortController,
        })
      }
      return Promise.resolve()
    })
}

export async function createElection(
  vocdoniClient: VocdoniSDKClient,
  createElectionFunction: (census: OffchainCensus) => UnpublishedElection
) {
  const { census, spreadsheet } = await getCsvCensus(vocdoniClient, path.join(__dirname, 'census.csv'))

  console.log('Creating election...')
  const election = createElectionFunction(census)

  console.log('Publishing election...')
  return await publishElection(election, vocdoniClient)
}
