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

// export const StripeSubscription = () => {
//   let [message, setMessage] = useState('');
//   let [success, setSuccess] = useState(false);
//   let [sessionId, setSessionId] = useState('');

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setSuccess(true);
//       setSessionId(query.get('session_id'));
//     }

//     if (query.get('canceled')) {
//       setSuccess(false);
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, [sessionId]);

//   if (!success && message === '') {
//     return <ProductDisplay />;
//   } else if (success && sessionId !== '') {
//     return <SuccessDisplay sessionId={sessionId} />;
//   } else {
//     return <Message message={message} />;
//   }
// }
export const StripeSubscription = () => {
  const { lookupKey }: { lookupKey?: string } = useParams()
  if (!lookupKey) {
    return < NotFound />
  }
  const origin = window.location.origin

  return (
    <CheckoutForm
      lookupKey={lookupKey}
      backendURL={import.meta.env.SAAS_URL}
      returnURL={`${origin}/${Routes.stripe.subscriptionReturn}`}
    />
  )
}

export const StripeSubscriptionReturn = () => {
  const { sessionId }: { sessionId?: string } = useParams()

  return <CheckoutReturn sessionId={sessionId || ''} />
}
