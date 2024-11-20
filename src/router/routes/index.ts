export const Routes = {
  root: '/',
  auth: {
    signIn: '/account/signin',
    signUp: '/account/signup',
    recovery: '/account/password',
    verify: '/account/verify',
    passwordReset: '/account/password/reset',
  },
  calculator: '/calculator',
  contactUs: '/contact-us',
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    process: '/admin/process/:id',
    processes: '/admin/processes/:page?/:status?',
    profile: '/admin/profile',
    team: '/admin/team',
  },
  demos: '/demos',
  faucet: '/faucet',
  features: '/features',
  organization: '/organization/:address',
  pricing: '/pricing',
  privacy: '/privacy',
  processes: {
    create: '/admin/processes/create',
    view: '/processes/:id',
  },
  stripe: {
    checkout: '/stripe/checkout/:amount?',
    return: '/stripe/return/:sessionId',
  },
  useCases: {
    root: '/use-cases',
    cityCouncils: '/city-councils',
    organizations: '/organizations',
    politicalParties: '/political-parties',
    coOps: '/coops',
    web3: '/web3',
    sportClubs: '/sport-clubs',
  },
  technology: '/technology',
  terms: '/terms',
}

export type RoutesType = typeof Routes
