interface ImportMeta {
  env: {
    NODE_ENV: string
    BASE_URL: string
    VOCDONI_ENVIRONMENT: string
    CUSTOM_FAUCET_URL: string
    CUSTOM_ORGANIZATION_DOMAINS: {
      [key: string]: string
    }
    features: {
      faucet: boolean
      vote: {
        anonymous: boolean
        overwrite: boolean
        secret: boolean
      }
      login: string[]
      census: string[]
      languages: string[]
      _census: {
        spreadsheet: boolean
        token: boolean
        web3: boolean
        csp: boolean
      }
    }
    theme: string
    CSP_URL: string
    CSP_PUBKEY: string
  }
}
