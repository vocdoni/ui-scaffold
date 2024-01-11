import { ColorModeScript } from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { WagmiConfig, useAccount, useWalletClient } from 'wagmi'
import { OrganizationModalProvider } from '~components/Organization/OrganizationModalProvider'
import { walletClientToSigner } from '~constants/wagmi-adapters'
import { VocdoniEnvironment } from './constants'
import { chains, wagmiConfig } from './constants/rainbow'
import { translations } from './i18n/components'
import { datesLocale } from './i18n/locales'
import { RoutesProvider } from './router/Router'
import { RainbowKitTheme, Theme } from './Theme'

export const Providers = () => {
  return (
    <Theme>
      <WagmiConfig config={wagmiConfig}>
        <AppProviders />
      </WagmiConfig>
    </Theme>
  )
}

export const AppProviders = () => {
  const { data } = useWalletClient()
  const { address } = useAccount()
  const { t, i18n } = useTranslation()

  let signer = null
  if (data && address && data.account.address === address) {
    signer = walletClientToSigner(data)
  }

  return (
    <RainbowKitTheme chains={chains}>
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
    </RainbowKitTheme>
  )
}
