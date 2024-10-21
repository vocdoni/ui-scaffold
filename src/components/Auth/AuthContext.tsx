import { createContext, ReactNode } from 'react'
import { useAuthProvider } from './useAuthProvider'

export const AuthContext = createContext<ReturnType<typeof useAuthProvider> | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
