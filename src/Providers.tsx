import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  useColorMode,
} from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/react-components'
import { useSigner, WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from './lib/rainbow/rainbow'
import { RoutesProvider } from './router/Router'
import { rainbowStyles, theme } from './theme'

export const Providers = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    <WagmiConfig client={wagmiClient}>
      <AppProviders />
    </WagmiConfig>
  </ChakraProvider>
)

export const AppProviders = () => {
  const { data: signer } = useSigner()
  const { colorMode } = useColorMode()

  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles(colorMode)}>
      <ClientProvider env='dev' signer={signer as Signer}>
        <ColorModeScript />
        <RoutesProvider />
      </ClientProvider>
    </RainbowKitProvider>
  )
}
