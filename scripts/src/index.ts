import chalk from 'chalk'
import { createDemoMeta } from './getDemoMeta'
import 'dotenv/config'
import { getApprovalElection } from './getApproval'
import { getVocdoniClient } from './utils/utils'
import { createElection, CreateElectionFunctionType } from './utils/election'
import { getMultichoiceElection } from './getMultichoice'
import { getSinglechoiceElection } from './getSinglechoice'
import { getMultiQuestion } from './getMultiQuestion'
import { SupportedCensusType } from './utils/census'

// These are the functions that create the elections we want to use
const createElectionFunctions: CreateElectionFunctionType[] = [
  getSinglechoiceElection,
  getMultiQuestion,
  getApprovalElection,
  getMultichoiceElection,
]

// Census type that te elections will have
const censusType: SupportedCensusType = 'csp'

async function main() {
  if (!process.env.PRIV_KEY) throw new Error('Missing PRIV_KEY env variable')
  const vocdoniClient = await getVocdoniClient(process.env.PRIV_KEY)
  const elections: string[] = []

  for (const createElectionFunction of createElectionFunctions) {
    console.log(chalk.green(`Creating election ${createElectionFunction.name}...`))
    const election = await createElection(vocdoniClient, createElectionFunction, censusType)
    elections.push(election.id)
    console.log(chalk.green('✅ Created election'))
  }

  // Create the data file to be used in the demo landing
  console.log(chalk.green('Adding new metadata to scaffold...'))
  createDemoMeta(elections)
  console.log(chalk.green('✅ Metadata added'))
}

main()
  .then(() => {
    console.log(chalk.green('Done ✅'))
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
