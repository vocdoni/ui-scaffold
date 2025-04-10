import { connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { privateKeyWallet, saasOAuthWallet } from '@vocdoni/rainbowkit-wallets'
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
import i18n from '~i18n'

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

const appName = 'Vocdoni UI Scaffold'
const projectId = '641a1f59121ad0b519cca3a699877a08'

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
  const web3: WalletGroup = {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName }),
      walletConnectWallet({ chains, projectId }),
    ],
  }

  const web2: WalletGroup = {
    groupName: 'Social',
    wallets: [googleWallet],
  }

  const recovery: WalletGroup = {
    groupName: i18n.t('rainbow.group.recovery'),
    wallets: [
      privateKeyWallet({
        name: i18n.t('rainbow.recovery'),
        iconUrl: 'https://www.svgrepo.com/show/525392/key-minimalistic-square-3.svg',
        chains,
      }),
    ],
  }

  return [web2, web3, recovery]
}

const connectors = connectorsForWallets(featuredConnectors())

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
