import { useContext } from 'react'
import { SaasAccountContext } from '~components/AccountSaas/SaasAccountContext'

export const useSaasAccount = () => {
  const context = useContext(SaasAccountContext)
  if (!context) {
    throw new Error('useSaasAccount must be used within an SaasAccountProvider')
  }
  return context
}
