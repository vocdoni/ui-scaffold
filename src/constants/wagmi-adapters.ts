import { getWalletClient, type WalletClient } from '@wagmi/core'
import { Web3Provider } from '@ethersproject/providers'

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) return undefined
  return walletClientToSigner(walletClient)
}
