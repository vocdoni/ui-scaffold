import { connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { saasOAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { configureChains, createConfig } from 'wagmi'
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  eos,
  fantom,
  gnosis,
  goerli,
  hardhat,
  localhost,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  zkSync,
  zora,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const usedChains = [
  mainnet,
  arbitrum,
  avalanche,
  base,
  bsc,
  eos,
  fantom,
  gnosis,
  goerli,
  hardhat,
  localhost,
  optimism,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  zkSync,
  zora,
]

export const { chains, publicClient } = configureChains(usedChains, [publicProvider()])

type WalletGroup = {
  groupName: string
  wallets: Wallet[]
}

export const googleWallet = saasOAuthWallet({
  id: 'google',
  chains,
  name: 'Google',
  iconUrl: 'https://authjs.dev/img/providers/google.svg',
  options: {
    oAuthServiceUrl: import.meta.env.OAUTH_URL,
    oAuthServiceProvider: 'google',
    saasBackendUrl: import.meta.env.SAAS_URL,
  },
})

const featuredConnectors = () => {
  const web2: WalletGroup = {
    groupName: 'Social',
    wallets: [googleWallet],
  }

  return [web2]
}

const connectors = connectorsForWallets(featuredConnectors())

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
