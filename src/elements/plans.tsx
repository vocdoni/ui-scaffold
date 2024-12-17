import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ComparisonTable } from '~components/Pricing/ComparisonTable'
import { SubscriptionPlans, usePlans } from '~components/Pricing/Plans'

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
    <>
      <SubscriptionPlans featuresRef={featuresRef} />
      <ComparisonTable ref={featuresRef} />
    </>
  )
}

export default PlansPublicPage
