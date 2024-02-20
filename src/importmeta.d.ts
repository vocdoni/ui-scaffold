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
      voting: string[]
      unimplemented_census: string[]
      languages: string[]
      _census: {
        spreadsheet: boolean
        token: boolean
        web3: boolean
        csp: boolean
      }
      _unimplemented_census: {
        phone: boolean
        email: boolean
        crm: boolean
        database: boolean
        digital_certificate: boolean
        others: boolean
      }
      _voting: {
        single: boolean
        multi: boolean
        approval: boolean
        participatory: boolean
        borda: boolean
      }
    }
    theme: string
    CSP_URL: string
    CSP_PUBKEY: string
  }
}
