import { useParams } from 'react-router-dom'
import { CheckoutForm, CheckoutReturn } from '~components/Faucet/Stripe'

export const StripeCheckout = () => {
  const { amount }: { amount?: string } = useParams()

  return <CheckoutForm amount={amount} />
}

export const StripeReturn = () => {
  const { sessionId }: { sessionId?: string } = useParams()

  return <CheckoutReturn sessionId={sessionId || ''} />
}
