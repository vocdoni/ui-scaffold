import { ChakraProvider, ColorModeScript, extendTheme, useColorMode } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { Signer } from '@ethersproject/abstract-signer';
import { useTranslation } from 'react-i18next'
import { WagmiConfig, useWalletClient } from 'wagmi'
import { OrganizationModalProvider } from '~components/Organization/OrganizationModalProvider'
import { walletClientToSigner } from '~constants/wagmi-adapters'
import { VocdoniEnvironment } from './constants'
import { chains, wagmiConfig } from './constants/rainbow'
import { translations } from './i18n/components'
import { datesLocale } from './i18n/locales'
import { RoutesProvider } from './router/Router'
import { rainbowStyles, theme } from './theme'

export const Providers = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    <WagmiConfig config={wagmiConfig}>
      <AppProviders />
    </WagmiConfig>
  </ChakraProvider>
)

export const AppProviders = () => {
  const { data } = useWalletClient()
  const { colorMode } = useColorMode()
  const { t, i18n } = useTranslation()

  let signer = null
  if (data) {
    signer = walletClientToSigner(data)
  }

  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles(colorMode)}>
      <ClientProvider
        env={VocdoniEnvironment as EnvOptions}
        signer={signer as Signer}
        locale={translations(t)}
        datesLocale={datesLocale(i18n.language)}
      >
        <OrganizationModalProvider>
          <ColorModeScript />
          <RoutesProvider />
        </OrganizationModalProvider>
      </ClientProvider>
    </RainbowKitProvider>
  )
}
