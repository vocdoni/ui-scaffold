import chalk from 'chalk'
import { createDemoMeta } from './demoMeta'
import 'dotenv/config'

async function main() {
  if (!process.env.PRIV_KEY) throw new Error('Missing PRIV_KEY env variable')

  console.log(chalk.green('Creating metadata...'))
  createDemoMeta()
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
