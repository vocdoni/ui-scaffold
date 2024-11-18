export const Routes = {
  root: '/',
  aboutUs: 'about-us',
  api: '/api',
  auth: {
    signIn: '/account/signin',
    signUp: '/account/signup',
    recovery: '/account/password',
    verify: '/account/verify',
    passwordReset: '/account/password/reset',
  },
  blog: 'https://blog.vocdoni.io/',
  calculator: '/calculator',
  careers: '/careers',
  compliance: '/compliance',
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    process: '/admin/process/:id',
    processes: '/admin/processes/:page?/:status?',
    profile: '/admin/profile',
    team: '/admin/team',
  },
  documentation: '/documentation',
  faucet: '/faucet',
  features: '',
  organization: '/organization/:address',
  pricing: '/pricing',
  privacy: '/privacy',
  processes: {
    create: '/admin/processes/create',
    view: '/processes/:id',
  },
  security: '/security',
  support: '/support',
  stripe: {
    checkout: '/stripe/checkout/:amount?',
    return: '/stripe/return/:sessionId',
  },
  terms: '/terms',
}

export type RoutesType = typeof Routes
