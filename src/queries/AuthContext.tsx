import { createContext, ReactNode } from 'react'
import { useAuthProvider } from './useAuthProvider'

export const AuthContext = createContext<ReturnType<typeof useAuthProvider> | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  if (!import.meta.env.SAAS_URL) {
    return <>{children}</>
  }
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
