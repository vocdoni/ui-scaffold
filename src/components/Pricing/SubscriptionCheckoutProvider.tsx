import React, { ReactNode, useState } from 'react'
import { CheckoutView, SubscriptionCheckoutProviderContext } from './use-subscription-checkout'

export const SubscriptionCheckoutProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<CheckoutView>('plans')
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null)

  const showCheckout = (planId: number) => {
    setSelectedPlanId(planId)
    setView('checkout')
  }

  const showPlans = () => {
    setSelectedPlanId(null)
    setView('plans')
  }

  return (
    <SubscriptionCheckoutProviderContext value={{ view, selectedPlanId, showCheckout, showPlans }}>
      {children}
    </SubscriptionCheckoutProviderContext>
  )
}
