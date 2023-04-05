import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createClient } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains([mainnet], [publicProvider()])

export const { connectors } = getDefaultWallets({
  appName: "Vocdoni's Voting Protocol",
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
