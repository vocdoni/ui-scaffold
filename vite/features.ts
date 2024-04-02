import merge from 'ts-deepmerge'

const features = () => {
  const defaults = {
    faucet: true,
    vote: {
      anonymous: true,
      overwrite: true,
      secret: true,
      customization: false,
    },
    login: ['web3', 'web2'],
    census: ['spreadsheet', 'token', 'web3', 'csp', 'gitcoin'],
    unimplemented_census: [],
    voting_type: ['single'],
    unimplemented_voting_type: [],
    languages: ['ca', 'en', 'es'],
  }

  const features = merge.withOptions({ mergeArrays: false }, defaults, JSON.parse(process.env.FEATURES || '{}'))
  const unimplemented_census = ['phone', 'email', 'crm', 'database', 'digital_certificate']
  const unimplemented_voting_type = ['multi', 'approval', 'participatory', 'borda']

  features.unimplemented_census.forEach((el) => {
    if (!unimplemented_census.includes(el)) throw new Error(`Unimplemented census ${el} does not exist`)
  })
  features.unimplemented_voting_type.forEach((el) => {
    if (!unimplemented_voting_type.includes(el)) throw new Error(`Unimplemented voting type ${el} does not exist`)
  })
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
    gitcoin: false,
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
