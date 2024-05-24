import { Census, UnpublishedElection, VocdoniSDKClient } from '@vocdoni/sdk'
import chalk from 'chalk'
import { getCensus, SupportedCensusType } from './census'

export const publishElection = async (election: UnpublishedElection, client: VocdoniSDKClient) => {
  if (!client) throw new Error('Missing client')

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

export type CreateElectionFunctionType = (census: Census, meta?: any) => UnpublishedElection

export async function createElection(
  vocdoniClient: VocdoniSDKClient,
  createElectionFunction: CreateElectionFunctionType,
  censusType: SupportedCensusType
) {
  let census: Census = await getCensus(censusType, vocdoniClient)
  let meta = getMetaElectionMetadata(censusType)

  console.log(chalk.yellow('Creating a new voting process!'))

  const election = createElectionFunction(census, meta)

  if (censusType === 'csp') {
    election.maxCensusSize = 4
  }
  return await publishElection(election, vocdoniClient)
}

export const getMetaElectionMetadata = (censusType: SupportedCensusType) => {
  const meta: any = {
    generated: 'script',
    census: {
      type: censusType,
    },
  }
  if (censusType === 'spreadsheet') {
    meta.census = {
      ...meta.census,
      fields: ['DNI', 'Data de Naixement'], //TODO: get from spreadsheet
      specs: {
        'Data de Naixement': {
          value: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$',
          message: "Ha d'estar en format dd/mm/aaaa",
        },
      },
    }
  }
  return meta
}
