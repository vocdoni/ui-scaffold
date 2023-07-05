import { ChakraProvider, ColorModeScript, extendTheme, useColorMode } from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useSigner, WagmiConfig } from 'wagmi'
import { VocdoniEnvironment } from './constants'
import { chains, wagmiClient } from './constants/rainbow'
import { translations } from './i18n/components'
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
  const { t } = useTranslation()

  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles(colorMode)}>
      <ClientProvider env={VocdoniEnvironment as EnvOptions} signer={signer as Signer} locale={translations(t)}>
        <ColorModeScript />
        <RoutesProvider />
      </ClientProvider>
    </RainbowKitProvider>
  )
}
