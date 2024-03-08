import merge from 'ts-deepmerge'

const features = () => {
  const defaults = {
    faucet: true,
    vote: {
      anonymous: true,
      overwrite: true,
      secret: true,
    },
    login: ['web3', 'web2'],
    census: ['spreadsheet', 'token', 'web3', 'csp'],
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
  // verify login options are valid
  const validLogins = ['web2', 'web3', 'recovery']
  features.login.forEach((login) => {
    if (!validLogins.includes(login)) {
      throw new Error(`Invalid login option: ${login}`)
    }
  })
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
