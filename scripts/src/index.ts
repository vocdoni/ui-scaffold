import chalk from 'chalk'
import { createDemoMeta } from './demoMeta'
import 'dotenv/config'
import { getApprovalElection } from './approval'
import { getVocdoniClient } from './utils/utils'
import { createElection, CreateElectionFunctionType } from './utils/election'
import { getMultichoiceElection } from './multichoice'
import { getSinglechoiceElection } from './singlechoice'
import { getMultiQuestion } from './multiQuestion'

// This are the functions that create the elections we want to use
const createElectionFunctions: CreateElectionFunctionType[] = [
  getSinglechoiceElection,
  getMultiQuestion,
  getApprovalElection,
  getMultichoiceElection,
]

async function main() {
  if (!process.env.PRIV_KEY) throw new Error('Missing PRIV_KEY env variable')
  const vocdoniClient = await getVocdoniClient(process.env.PRIV_KEY)
  const elections: string[] = []

  for (const createElectionFunction of createElectionFunctions) {
    console.log(chalk.green(`Creating election ${createElectionFunction.name}...`))
    const election = await createElection(vocdoniClient, createElectionFunction)
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
