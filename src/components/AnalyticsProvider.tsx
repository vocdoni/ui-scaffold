import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import {
  AnalyticsEvent,
  initializeGTM,
  initializePlausible,
  trackGTMEvent,
  trackPlausibleEvent,
} from '~utils/analytics'

const useAnalyticsProvider = () => {
  useEffect(() => {
    const gtmContainerId = import.meta.env.GTM_CONTAINER_ID
    const plausibleDomain = import.meta.env.PLAUSIBLE_DOMAIN

    if (plausibleDomain) {
      initializePlausible({
        domain: plausibleDomain,
      })
    }

    if (gtmContainerId && window.location.pathname === '/') {
      initializeGTM({
        gtmId: gtmContainerId,
      })
    }
  }, [])

  const trackEvent = (event: AnalyticsEvent) => {
    trackPlausibleEvent(event)
    trackGTMEvent(event)
  }

  return {
    trackEvent,
    trackPlausibleEvent,
    trackGTMEvent,
  }
}

type AnalyticsContextValue = ReturnType<typeof useAnalyticsProvider>
const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

export const AnalyticsProvider = ({ children }: PropsWithChildren) => {
  const value = useAnalyticsProvider()

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}
