import { connectorsForWallets, Wallet, WalletList } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { oAuthWallet, privateKeyWallet } from '@vocdoni/rainbowkit-wallets'
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

export const { chains, publicClient } = configureChains(
  [
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
  ],
  [publicProvider()]
)

const appName = 'Vocdoni UI Scaffold'
const projectId = '641a1f59121ad0b519cca3a699877a08'

type WalletGroup = {
  groupName: string
  wallets: Wallet[]
}

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
    wallets: [
      oAuthWallet({
        id: 'github',
        chains,
        name: 'Github',
        iconUrl: 'https://authjs.dev/img/providers/github-dark.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.io/',
          oAuthServiceProvider: 'github',
        },
      }) as unknown as Wallet,
      oAuthWallet({
        id: 'google',
        chains,
        name: 'Google',
        iconUrl: 'https://authjs.dev/img/providers/google.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.io/',
          oAuthServiceProvider: 'google',
        },
      }) as unknown as Wallet,
      oAuthWallet({
        id: 'facebook',
        chains,
        name: 'Facebook',
        iconUrl: 'https://authjs.dev/img/providers/facebook.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.io/',
          oAuthServiceProvider: 'facebook',
        },
      }),
    ],
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

  const connectors: { [key: string]: WalletGroup } = { web2, web3, recovery }
  const wallets: WalletList = []
  for (const connector of import.meta.env.features.login) {
    wallets.push(connectors[connector])
  }

  return wallets
}

const connectors = connectorsForWallets(featuredConnectors())

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
