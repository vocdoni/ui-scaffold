import { Signer } from '@ethersproject/abstract-signer'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ClientProvider, ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/react-providers'
import { EnvOptions, PublishedElection } from '@vocdoni/sdk'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
import { useAccount, useWalletClient } from 'wagmi'
import { ProcessView as ProcessViewComponent } from '~components/Process/View'
import { farcasterSignerAdapter, isFarcasterMiniapp } from '~utils/farcaster'
import { VocdoniEnvironment } from '~src/constants'
import { walletClientToSigner } from '~src/constants/wagmi-adapters'
import { translations } from '~src/i18n/components'
import { datesLocale } from '~src/i18n/locales'
import { useDocumentTitle } from '~src/use-document-title'

const ProcessView = () => {
  const { election } = useElection()
  let title = ''
  if (election instanceof PublishedElection) {
    title = election?.title.default
  }
  useDocumentTitle(title)
  return <ProcessViewComponent />
}

/**
 * Farcaster-aware ClientProvider wrapper
 * Automatically uses Farcaster wallet when running in Farcaster miniapp context,
 * otherwise falls back to Wagmi wallet
 */
const FarcasterAwareClientProvider = ({ children }: PropsWithChildren) => {
  const { data: wagmiWalletClient } = useWalletClient()
  const { address } = useAccount()
  const { t, i18n } = useTranslation()
  const [farcasterSigner, setFarcasterSigner] = useState<Signer | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Get Farcaster signer if in miniapp
  useEffect(() => {
    const initFarcaster = async () => {
      if (isFarcasterMiniapp()) {
        try {
          // Get Farcaster signer (SDK already initialized in AppProviders)
          const signer = await farcasterSignerAdapter()
          setFarcasterSigner(signer)
          console.log('✅ Using Farcaster wallet for voting')
        } catch (error) {
          console.error('❌ Farcaster signer creation failed, falling back to Wagmi:', error)
        }
      }
      setIsInitialized(true)
    }

    initFarcaster()
  }, [])

  // Determine which signer to use
  let signer: Signer | null = null
  if (farcasterSigner) {
    // Use Farcaster signer if available
    signer = farcasterSigner
  } else if (wagmiWalletClient && address && wagmiWalletClient.account.address === address) {
    // Fall back to Wagmi wallet
    signer = walletClientToSigner(wagmiWalletClient)
  }

  // Don't render until Farcaster initialization is complete
  if (!isInitialized) {
    return null
  }

  return (
    <ClientProvider
      env={VocdoniEnvironment as EnvOptions}
      signer={signer as Signer}
      locale={translations(t)}
      datesLocale={datesLocale(i18n.language)}
    >
      {children}
    </ClientProvider>
  )
}

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <FarcasterAwareClientProvider>
        <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus autoUpdate>
          <ProcessView />
        </ElectionProvider>
      </FarcasterAwareClientProvider>
    </OrganizationProvider>
  )
}

export default Process
