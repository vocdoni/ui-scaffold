import { createContext, ReactNode } from 'react'
import { useSaasAccountProvider } from './useSaasAccountProvider'

export const SaasAccountContext = createContext<ReturnType<typeof useSaasAccountProvider> | undefined>(undefined)

export const SaasAccountProvider = ({ children }: { children: ReactNode }) => {
  const isSaas = !!import.meta.env.SAAS_URL
  const saasAcount = useSaasAccountProvider({ options: { enabled: isSaas } })
  if (!isSaas) {
    return children
  }
  return <SaasAccountContext.Provider value={saasAcount}>{children}</SaasAccountContext.Provider>
}
