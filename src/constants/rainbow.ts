import { Wallet, connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { coinbaseWallet, metaMaskWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets'
import { oAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { configureChains, createClient } from 'wagmi'
import type { Chain } from 'wagmi/chains'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const vocdoni = {
  ...mainnet,
  // we need id zero to bypass the switch chain behavior
  id: 0,
  name: 'Vocdoni',
  network: 'none',
} as const satisfies Chain

export const { chains, provider } = configureChains([vocdoni], [publicProvider()])
const appName = 'Vocdoni UI Scaffold'
const projectId = '641a1f59121ad0b519cca3a699877a08'

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName }),
    ],
  },
  {
    groupName: 'Social',
    wallets: [
      oAuthWallet({
        chains,
        name: 'Github',
        iconUrl: 'https://authjs.dev/img/providers/github.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.net/',
          oAuthServiceProvider: 'github',
        },
      }) as Wallet,
      oAuthWallet({
        chains,
        name: 'Google',
        iconUrl: 'https://authjs.dev/img/providers/google.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.net/',
          oAuthServiceProvider: 'google',
        },
      }) as Wallet,
      oAuthWallet({
        chains,
        name: 'Facebook',
        iconUrl: 'https://authjs.dev/img/providers/facebook.svg',
        options: {
          oAuthServiceUrl: 'https://oauth.vocdoni.net/',
          oAuthServiceProvider: 'facebook',
        },
      }) as Wallet,
    ],
  },
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
