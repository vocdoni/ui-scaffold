interface ImportMeta {
  env: {
    NODE_ENV: string
    DEV: boolean
    BASE_URL: string
    VOCDONI_ENVIRONMENT: string
    CUSTOM_ORGANIZATION_DOMAINS: {
      [key: string]: string
    }
    EMAILJS_SERVICE_ID: string
    EMAILJS_TEMPLATE_ID: string
    EMAILJS_PUBLIC_ID: string
    theme: string
    title: string
    CSP_URL: string
    CSP_PUBKEY: string
    DEFAULT_CENSUS_SIZE: number
    STRIPE_PUBLIC_KEY: string
    SAAS_URL: string
    OAUTH_URL: string
    PRIORITY_SUPPORT_PHONE: string
    CALCOM_EVENT_SLUG: string
    VIDEO_TUTORIAL: string
    GTM_CONTAINER_ID: string
    PLAUSIBLE_DOMAIN: string
    VOCDONI_CONTACT_EMAIL: string
    ANNOUNCEMENT: string
  }
}
