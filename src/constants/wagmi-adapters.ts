import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { getWalletClient, type GetWalletClientReturnType } from '@wagmi/core'
import { wagmiConfig } from './rainbow'

export function walletClientToSigner(walletClient: GetWalletClientReturnType) {
  if (!walletClient) throw new Error('Wallet client not found')
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new Web3Provider(transport as ExternalProvider, network)
  const signer = provider.getSigner(account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient(wagmiConfig, { chainId })
  if (!walletClient) return undefined
  return walletClientToSigner(walletClient)
}
