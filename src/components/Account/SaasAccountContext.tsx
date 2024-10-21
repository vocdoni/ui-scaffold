import { createContext, ReactNode } from 'react'
import { useSaasAccountProvider } from './useSaasAccountProvider'

export const SaasAccountContext = createContext<ReturnType<typeof useSaasAccountProvider> | undefined>(undefined)

export const SaasAccountProvider = ({ children }: { children: ReactNode }) => {
  const saasAcount = useSaasAccountProvider()
  return <SaasAccountContext.Provider value={saasAcount}>{children}</SaasAccountContext.Provider>
}
