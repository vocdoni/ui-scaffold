import { Flex } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Clients from '~components/Home/Clients'
import Faqs from '~components/Home/Faqs'
import { ComparisonTable } from '~components/Pricing/ComparisonTable'
import { SubscriptionPlans, usePlans } from '~components/Pricing/Plans'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'

const PlansPublicPage = () => {
  const featuresRef = useRef<HTMLDivElement>(null)
  const { isLoading } = usePlans()
  const location = useLocation()

  // Scroll to the comparison table if the ?compare query param is present
  useEffect(() => {
    if (!isLoading && location.search === '?compare' && featuresRef && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.search, isLoading])

  return (
    <PricingModalProvider>
      <Flex flexDirection='column' gap={{ base: '60px', lg: '100px' }} width='full' mx='auto'>
        <SubscriptionPlans featuresRef={featuresRef} />
        <ComparisonTable ref={featuresRef} />
        <Clients />
        <Faqs />
      </Flex>
    </PricingModalProvider>
  )
}

export default PlansPublicPage
