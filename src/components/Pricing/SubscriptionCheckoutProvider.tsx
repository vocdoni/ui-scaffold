import React, { ReactNode, useState } from 'react'
import { SubscriptionCheckoutFormValues } from './Plans'
import { CheckoutView, SubscriptionCheckoutProviderContext } from './use-subscription-checkout'

export const SubscriptionCheckoutProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<CheckoutView>('plans')
  const [checkout, setCheckout] = useState<SubscriptionCheckoutFormValues>()

  const showCheckout = (checkout: SubscriptionCheckoutFormValues) => {
    setCheckout(checkout)
    setView('checkout')
  }

  const showPlans = () => {
    setCheckout(undefined)
    setView('plans')
  }

  return (
    <SubscriptionCheckoutProviderContext value={{ view, checkout, showCheckout, showPlans }}>
      {children}
    </SubscriptionCheckoutProviderContext>
  )
}
