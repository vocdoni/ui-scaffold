import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { CheckoutForm } from '~components/Faucet/Stripe'

export const Checkout = () => {
  const { amount }: { amount?: string } = useParams()
  return (
    <Box>
      <CheckoutForm amount={amount} />
    </Box>
  )
}
