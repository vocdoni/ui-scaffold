interface ImportMeta {
  env: {
    NODE_ENV: string
    BASE_URL: string
    VOCDONI_ENVIRONMENT: string
    CUSTOM_FAUCET_URL: string
    CUSTOM_ORGANIZATION_DOMAINS: {
      [key: string]: string
    }
    EMAILJS_SERVICE_ID: string
    EMAILJS_TEMPLATE_ID: string
    EMAILJS_PUBLIC_ID: string
    features: {
      faucet: boolean
      vote: {
        anonymous: boolean
        overwrite: boolean
        secret: boolean
        customization: boolean
      }
      login: string[]
      census: string[]
      unimplemented_census: string[]
      voting_type: string[]
      unimplemented_voting_type: string[]
      languages: string[]
      _census: {
        spreadsheet: boolean
        token: boolean
        web3: boolean
        csp: boolean
        gitcoin: boolean
      }
    }
    theme: string
    title: string
    CSP_URL: string
    CSP_PUBKEY: string
    DEFAULT_CENSUS_SIZE: number
    SAAS_URL: string
  }
}
