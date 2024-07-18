import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { CheckoutForm, CheckoutReturn } from '~components/Faucet/Stripe'

export const StripeCheckout = () => {
  const { amount }: { amount?: string } = useParams()

  return (
    <Box>
      <CheckoutForm amount={amount} />
    </Box>
  )
}

export const StripeReturn = () => {
  const { sessionId }: { sessionId?: string } = useParams()
  return (
    <Box>
      <CheckoutReturn sessionId={sessionId || ''} />
    </Box>
  )
}
