import chalk from 'chalk'
import { createDemoMeta } from './demoMeta'
import 'dotenv/config'
import { getApprovalElection } from './approval'
import { getVocdoniClient } from './utils/utils'
import { createElection } from './utils/election'
import { getMultichoiceElection } from './multichoice'

async function main() {
  if (!process.env.PRIV_KEY) throw new Error('Missing PRIV_KEY env variable')
  const vocdoniClient = await getVocdoniClient(process.env.PRIV_KEY)
  const elections: string[] = []

  console.log(chalk.green('Creating approval election...'))
  const approvalElection = await createElection(vocdoniClient, getApprovalElection)
  elections.push(approvalElection.id)
  console.log(chalk.green('✅ Created approval election'))

  console.log(chalk.green('Creating approval election...'))
  const multichoiceElection = await createElection(vocdoniClient, getMultichoiceElection)
  elections.push(multichoiceElection.id)
  console.log(chalk.green('✅ Created approval election'))

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
