import { merge } from 'ts-deepmerge'
import ValidLanguages from '../src/i18n/languages.mjs'

// Define constants for valid values
const ValidLogins = ['web2', 'web3', 'recovery'] as const
const ValidCensus = ['spreadsheet', 'token', 'web3', 'csp', 'gitcoin'] as const
const UnimplementedCensuses = ['phone', 'email', 'crm', 'database', 'digital_certificate'] as const
const ValidVotingTypes = ['single', 'approval'] as const
const UnimplementedVotingTypes = ['multi', 'participatory', 'borda'] as const

// Convert constant arrays to union types
type Login = (typeof ValidLogins)[number]
type Census = (typeof ValidCensus)[number]
type UnimplementedCensus = (typeof UnimplementedCensuses)[number]
type VotingType = (typeof ValidVotingTypes)[number]
type UnimplementedVotingType = (typeof UnimplementedVotingTypes)[number]
type Language = (typeof ValidLanguages)[number]

type Features = {
  faucet: boolean
  vote: {
    anonymous: boolean
    overwrite: boolean
    secret: boolean
    customization: boolean
  }
  calculator: boolean
  login: Login[]
  census: Census[]
  unimplemented_census: UnimplementedCensus[]
  voting_type: VotingType[]
  unimplemented_voting_type: UnimplementedVotingType[]
  languages: Language[]
  _census: {
    spreadsheet: boolean
    token: boolean
    web3: boolean
    csp: boolean
    gitcoin: boolean
  }
}

type Defaults = Omit<Features, '_census'>

const features = () => {
  const defaults: Defaults = {
    faucet: true,
    calculator: true,
    vote: {
      anonymous: true,
      overwrite: true,
      secret: true,
      customization: false,
    },
    login: ['web3', 'web2'],
    census: ['spreadsheet', 'token', 'web3', 'csp', 'gitcoin'],
    unimplemented_census: ['phone', 'email', 'crm', 'database', 'digital_certificate'],
    voting_type: ['single', 'approval'],
    unimplemented_voting_type: ['multi', 'participatory', 'borda'],
    languages: ValidLanguages,
  }

  const features = merge.withOptions(
    { mergeArrays: false },
    defaults,
    JSON.parse(process.env.FEATURES || '{}')
  ) as unknown as Features

  features.unimplemented_census.forEach((el) => {
    if (!UnimplementedCensuses.includes(el)) throw new Error(`Unimplemented census ${el} does not exist`)
  })
  features.unimplemented_voting_type.forEach((el) => {
    if (!UnimplementedVotingTypes.includes(el)) throw new Error(`Unimplemented voting type ${el} does not exist`)
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

  // Verify login options are valid
  features.login.forEach((login) => {
    if (!ValidLogins.includes(login)) {
      throw new Error(`Invalid login option: ${login}`)
    }
  })

  // We need pure booleans in order to ensure rollup tree-shakes non-enabled features.
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
  console.info('features:', features)

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
