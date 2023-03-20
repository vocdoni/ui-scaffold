import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  useColorMode,
} from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/react-components'
import { EnvOptions } from '@vocdoni/sdk'
import { useSigner, WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from './constants/rainbow'
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
      <ClientProvider
        env={(process.env.REACT_APP_VOCDONI_ENVIRONMENT as EnvOptions) || 'stg'}
        signer={signer as Signer}
      >
        <ColorModeScript />
        <RoutesProvider />
      </ClientProvider>
    </RainbowKitProvider>
  )
}
