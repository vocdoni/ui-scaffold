import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CheckoutForm, CheckoutReturn } from '~components/Faucet/Stripe'
import { Routes } from '~src/router/routes'
import NotFound from './NotFound'

export const StripeCheckout = () => {
  const { amount }: { amount?: string } = useParams()

  return <CheckoutForm amount={amount} returnURL={`${origin}/${Routes.stripe.checkoutReturn}`} />
}

export const StripeCheckoutReturn = () => {
  const { sessionId }: { sessionId?: string } = useParams()

  return <CheckoutReturn sessionId={sessionId || ''} />
}
export const StripeSubscription = () => {
  const { lookupKey }: { lookupKey?: string } = useParams()
  if (!lookupKey) {
    return < NotFound />
  }
  const { amount }: { amount?: string } = useParams()


  const origin = window.location.origin

  return (
    <CheckoutForm
      lookupKey={lookupKey}
      amount={amount}
      backendURL={import.meta.env.SAAS_URL}
      returnURL={`${origin}/${Routes.stripe.subscriptionReturn}`}
    />
  )
}

export const StripeSubscriptionReturn = () => {
  const { sessionId }: { sessionId?: string } = useParams()

  return <CheckoutReturn sessionId={sessionId || ''} />
}
