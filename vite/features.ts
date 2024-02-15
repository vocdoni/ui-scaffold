import merge from 'ts-deepmerge'

const features = () => {
  const defaults = {
    faucet: true,
    vote: {
      anonymous: true,
      overwrite: true,
      secret: true,
      customization: true,
    },
    login: ['web3', 'web2'],
    census: ['spreadsheet', 'token', 'web3', 'csp'],
    unimplemented_census: ['phone', 'email', 'crm', 'database', 'digital_certificate', 'others'],
    voting: ['single', 'multi', 'approval', 'participatory', 'borda'],
    languages: ['ca', 'en', 'es'],
  }
  const features = merge.withOptions({ mergeArrays: false }, defaults, JSON.parse(process.env.FEATURES || '{}'))
  // Ensure at least one item is loaded in each feature array
  if (!features.login.length) {
    features.login = ['web3']
  }
  if (!features.census.length) {
    features.census = ['spreadsheet']
  }
  if (!features.languages.length) {
    features.languages = ['en']
  }
  // We need pure booleans in order to ensure rollup tree-shakes non enabled features.
  // Using functions like `.includes()` would prevent such tree-shaking, resulting in a bigger bundle.
  features._census = {
    spreadsheet: false,
    token: false,
    web3: false,
    csp: false,
  }
  for (const census of features.census) {
    features._census[census] = true
  }

  console.log('features:', features)

  return {
    name: 'feature-flags',
    config() {
      return {
        define: {
          'import.meta.env.features': features,
        },
      }
    },
  }
}

export default features
