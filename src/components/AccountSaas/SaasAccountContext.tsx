import { createContext, ReactNode } from 'react'
import { useSaasAccountProvider } from './useSaasAccountProvider'

export const SaasAccountContext = createContext<ReturnType<typeof useSaasAccountProvider> | undefined>(undefined)

export const SaasAccountProvider = ({ children }: { children: ReactNode }) => {
  if (!import.meta.env.SAAS_URL) {
    return <>{children}</>
  }
  const saasAcount = useSaasAccountProvider()
  return <SaasAccountContext.Provider value={saasAcount}>{children}</SaasAccountContext.Provider>
}
