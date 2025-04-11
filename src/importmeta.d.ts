interface ImportMeta {
  env: {
    NODE_ENV: string
    DEV: boolean
    BASE_URL: string
    VOCDONI_ENVIRONMENT: string
    CUSTOM_FAUCET_URL: string
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
  }
}
