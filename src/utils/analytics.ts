import { init, type PlausibleConfig, track } from '@plausible-analytics/tracker'
import TagManager from 'react-gtm-module'

export const AnalyticsEvent = {
  AccountSignup: 'Signup',
  OrganizationCreated: 'OrganizationCreated',
  UserLoggedIn: 'LoggedIn',
  ProcessCreated: 'ProcessCreated',
  SubscriptionSuccessful: 'SubscriptionSuccessful',
} as const

export interface AnalyticsEvent {
  name: (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]
  props?: Record<string, string>
}

let plausibleInitialized = false
let gtmInitialized = false

export const initializeGTM = (config: TagManager.TagManagerArgs): void => {
  if (gtmInitialized) return
  try {
    TagManager.initialize(config)
    gtmInitialized = true
  } catch (error) {
    console.error('Failed to initialize GTM:', error)
  }
}

export const initializePlausible = (config: PlausibleConfig): void => {
  if (plausibleInitialized) return

  try {
    init(config)
    plausibleInitialized = true
  } catch (error) {
    console.error('Failed to initialize Plausible:', error)
  }
}

export const trackPlausibleEvent = (event: AnalyticsEvent): void => {
  try {
    if (!plausibleInitialized) return

    track(event.name, { props: event.props })
  } catch (error) {
    console.error('Failed to track Plausible event:', error)
  }
}

export const trackGTMEvent = (event: AnalyticsEvent): void => {
  if (!gtmInitialized) return
  try {
    TagManager.dataLayer({
      dataLayer: {
        event: event.name,
        ...event.props,
      },
    })
  } catch (error) {
    console.error('Failed to track GTM event:', error)
  }
}
