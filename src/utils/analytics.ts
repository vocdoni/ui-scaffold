import { init, type PlausibleConfig, track } from '@plausible-analytics/tracker'
import TagManager from 'react-gtm-module'

export const AnalyticsEvent = {
  AccountSignup: 'Signup',
  OrganizationCreated: 'OrganizationCreated',
  UserLoggedIn: 'LoggedIn',
  ProcessCreated: 'ProcessCreated',
  SubscriptionSuccessful: 'SubscriptionSuccessful',
  TriedMultiquestionMultichoice: 'MMAttempt',
} as const

export interface AnalyticsEvent {
  name: (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]
  props?: Record<string, string>
}

let plausibleInitialized = false
let gtmInitialized = false

const getAnalyticsClientId = (): string | undefined => {
  const analyticsClientId = import.meta.env.ANALYTICS_CLIENT_ID
  return analyticsClientId?.trim() || undefined
}

const addAnalyticsClientIdToPlausibleConfig = (config: PlausibleConfig): PlausibleConfig => {
  const analyticsClientId = getAnalyticsClientId()
  if (!analyticsClientId) return config

  const existingCustomProperties = config.customProperties
  if (typeof existingCustomProperties === 'function') {
    return {
      ...config,
      customProperties: (eventName) => ({
        ...existingCustomProperties(eventName),
        client: analyticsClientId,
      }),
    }
  }

  return {
    ...config,
    customProperties: {
      ...existingCustomProperties,
      client: analyticsClientId,
    },
  }
}

export const initializeGTM = (config: TagManager.TagManagerArgs): void => {
  if (gtmInitialized) return
  try {
    TagManager.initialize(config)
    const analyticsClientId = getAnalyticsClientId()
    if (analyticsClientId) {
      TagManager.dataLayer({
        dataLayer: {
          client: analyticsClientId,
        },
      })
    }
    gtmInitialized = true
  } catch (error) {
    console.error('Failed to initialize GTM:', error)
  }
}

export const initializePlausible = (config: PlausibleConfig): void => {
  if (plausibleInitialized) return

  try {
    init(addAnalyticsClientIdToPlausibleConfig(config))
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
