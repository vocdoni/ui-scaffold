import { ChakraProvider, ColorModeScript, extendTheme, useColorMode } from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useAccount, useWalletClient, WagmiConfig } from 'wagmi'
import { OrganizationModalProvider } from '~components/Organization/OrganizationModalProvider'
import { walletClientToSigner } from '~constants/wagmi-adapters'
import { VocdoniEnvironment } from './constants'
import { chains, wagmiConfig } from './constants/rainbow'
import { translations } from './i18n/components'
import { datesLocale } from './i18n/locales'
import { RoutesProvider } from './router/Router'
import { rainbowStyles, theme } from './theme/onvote'

export const Providers = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    <WagmiConfig config={wagmiConfig}>
      <AppProviders />
    </WagmiConfig>
  </ChakraProvider>
)

export const AppProviders = () => {
  const { data } = useWalletClient()
  const { address } = useAccount()
  const { colorMode } = useColorMode()
  const { t, i18n } = useTranslation()

  let signer = null
  if (data && address) {
    signer = walletClientToSigner(data)
  }

  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles(colorMode)}>
      <ClientProvider
        env={VocdoniEnvironment as EnvOptions}
        signer={signer as Signer}
        locale={translations(t)}
        datesLocale={datesLocale(i18n.language)}
        options={{ faucet_url: import.meta.env.CUSTOM_FAUCET_URL }}
      >
        <OrganizationModalProvider>
          <ColorModeScript />
          <RoutesProvider />
        </OrganizationModalProvider>
      </ClientProvider>
    </RainbowKitProvider>
  )
}
