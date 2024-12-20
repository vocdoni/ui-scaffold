import { ColorModeScript } from '@chakra-ui/react'
import { Signer } from '@ethersproject/abstract-signer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClientProvider } from '@vocdoni/chakra-components'
import { EnvOptions } from '@vocdoni/sdk'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useWalletClient, WagmiConfig } from 'wagmi'
import { SaasAccountProvider } from '~components/Account/SaasAccountContext'
import { AuthProvider } from '~components/Auth/AuthContext'
import { SubscriptionProvider } from '~components/Auth/Subscription'
import { walletClientToSigner } from '~constants/wagmi-adapters'
import { VocdoniEnvironment } from './constants'
import { chains, wagmiConfig } from './constants/rainbow'
import { translations } from './i18n/components'
import { datesLocale } from './i18n/locales'
import { RoutesProvider } from './router/Router'
import { RainbowKitTheme, Theme } from './Theme'

const queryClient = new QueryClient()

export const Providers = () => {
  return (
    <Theme>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppProviders />
        </QueryClientProvider>
      </WagmiConfig>
    </Theme>
  )
}

const SaasProviders = ({ children }: PropsWithChildren<{}>) => (
  <AuthProvider>
    <SubscriptionProvider>
      <SaasAccountProvider>{children}</SaasAccountProvider>
    </SubscriptionProvider>
  </AuthProvider>
)

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
        <SaasProviders>
          <ColorModeScript />
          <RoutesProvider />
        </SaasProviders>
      </ClientProvider>
    </RainbowKitTheme>
  )
}
