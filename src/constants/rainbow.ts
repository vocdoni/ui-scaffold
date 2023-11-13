import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
// import { oAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { oAuthWallet } from '@vocdoni/rainbowkit-wallets'
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

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
  {
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
  },
])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
