import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { oAuthWallet, privateKeyWallet, saasOAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { createConfig, http } from 'wagmi'
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
  zora,
} from 'wagmi/chains'
import i18n from '~i18n'

// Define chains for the application
const chains = [
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
  zora,
] as const

export { chains }

const appName = 'Vocdoni UI Scaffold'
const projectId = '641a1f59121ad0b519cca3a699877a08'

export const googleWallet = saasOAuthWallet({
  id: 'google',
  name: 'Google',
  iconUrl: 'https://authjs.dev/img/providers/google.svg',
  options: {
    oAuthServiceUrl: import.meta.env.OAUTH_URL,
    oAuthServiceProvider: 'google',
    saasBackendUrl: import.meta.env.SAAS_URL,
  },
})

const featuredConnectors = [
  {
    groupName: 'Popular',
    wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet],
  },
  {
    groupName: 'Social',
    wallets: [
      () =>
        oAuthWallet({
          id: 'github',
          name: 'Github',
          iconUrl: 'https://authjs.dev/img/providers/github-dark.svg',
          options: {
            oAuthServiceUrl: 'https://oauth.vocdoni.io/',
            oAuthServiceProvider: 'github',
          },
        }),
      () =>
        oAuthWallet({
          id: 'google',
          name: 'Google',
          iconUrl: 'https://authjs.dev/img/providers/google.svg',
          options: {
            oAuthServiceUrl: 'https://oauth.vocdoni.io/',
            oAuthServiceProvider: 'google',
          },
        }),
      () =>
        oAuthWallet({
          id: 'facebook',
          name: 'Facebook',
          iconUrl: 'https://authjs.dev/img/providers/facebook.svg',
          options: {
            oAuthServiceUrl: 'https://oauth.vocdoni.io/',
            oAuthServiceProvider: 'facebook',
          },
        }),
      () => googleWallet,
    ],
  },
  {
    groupName: i18n.t('rainbow.group.recovery'),
    wallets: [
      () =>
        privateKeyWallet({
          name: i18n.t('rainbow.recovery'),
          iconUrl: 'https://www.svgrepo.com/show/525392/key-minimalistic-square-3.svg',
        }),
    ],
  },
]

const connectors = connectorsForWallets(featuredConnectors, {
  appName,
  projectId,
})

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [avalanche.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [eos.id]: http(),
    [fantom.id]: http(),
    [gnosis.id]: http(),
    [goerli.id]: http(),
    [hardhat.id]: http(),
    [localhost.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [polygonZkEvm.id]: http(),
    [zora.id]: http(),
  },
})
