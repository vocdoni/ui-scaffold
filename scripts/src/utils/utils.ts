import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { Account, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { Wallet, ethers } from 'ethers'
import { AccountInfo, DemoMeta } from '../getDemoMeta'

export const createAccount = async () => {
  console.log(chalk.green(`Creating organization ${DemoMeta.orgName}...`))
  const wallet = Wallet.createRandom()
  const privKey = wallet.privateKey
  console.log(
    chalk.blue(`Wallet address: ${wallet.address}\nWallet private/public keys: ${privKey} / ${wallet.publicKey}`)
  )
  const vocdoniClient = await getVocdoniClient(privKey)
  await vocdoniClient.createAccount({
    account: AccountInfo,
  })
  console.log(chalk.green(`✅ Org created`))

  return vocdoniClient
}

export const getVocdoniClient = async (privKey: string) => {
  const wallet: Wallet = new ethers.Wallet(privKey)

  const vocdoniClient = new VocdoniSDKClient({
    wallet,
    env: (process.env.VOCDONI_ENV as EnvOptions) ?? EnvOptions.DEV,
    api_url: process.env.API_URL,
  })

  try {
    await vocdoniClient.fetchAccountInfo(wallet.address)
  } catch (error) {
    await vocdoniClient.createAccount()
  }

  return vocdoniClient
}

export const copyFile = (source: string, destination: string) => {
  source = path.resolve(source)
  destination = path.resolve(destination)

  // assert source exists
  if (!fs.existsSync(source)) {
    console.error(chalk.red(`Source file ${source} does not exist`))
    return
  }

  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error(chalk.red(`Error occurred while copying file ${source} `), err)
    } else {
      console.log(chalk.green(`Done ✅ File ${source} copied successfully`))
    }
  })
}
