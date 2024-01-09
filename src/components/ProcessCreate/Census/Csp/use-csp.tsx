import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { CspAdminClientOptions, VocdoniAdminSDKClient } from 'vocdoni-admin-sdk'
import { Wallet, Signer } from 'ethers'

export const CspAdminContext = createContext<any>(null)

export type CspAdminProviderProps = {
  children?: ReactNode
  signer?: Wallet | Signer
}

export const CspAdminProvider = ({ children, signer }: CspAdminProviderProps) => {
  const [vocdoniAdminClient, setVocdoniAdminClient] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const opts: CspAdminClientOptions = {
        cspUrl: import.meta.env.CSP_URL + '/auth/elections/admin',
      }

      if (signer) {
        opts.wallet = signer as Wallet | Signer
      }

      setVocdoniAdminClient(new VocdoniAdminSDKClient(opts))
    })()
  }, [signer])

  const value = {
    vocdoniAdminClient,
  }
  return <CspAdminContext.Provider value={value}>{children}</CspAdminContext.Provider>
}

export const useCspAdmin = () => {
  const cspAdmin = useContext(CspAdminContext)

  if (!cspAdmin) {
    throw new Error('useCspAdmin() must be used inside an <CspAdminProvider /> declaration')
  }

  return cspAdmin
}
