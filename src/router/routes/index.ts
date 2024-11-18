export const Routes = {
  root: '/',
  aboutUs: 'about-us',
  api: '',
  auth: {
    signIn: '/account/signin',
    signUp: '/account/signup',
    recovery: '/account/password',
    verify: '/account/verify',
    passwordReset: '/account/password/reset',
  },
  blog: 'https://blog.vocdoni.io/',
  calculator: '/calculator',
  careers: '',
  compliance: '',
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    process: '/admin/process/:id',
    processes: '/admin/processes/:page?/:status?',
    profile: '/admin/profile',
    team: '/admin/team',
  },
  documentation: '',
  faucet: '/faucet',
  features: '',
  organization: '/organization/:address',
  pricing: '',
  privacy: '/privacy',
  processes: {
    create: '/admin/processes/create',
    view: '/processes/:id',
  },
  security: '',
  support: '',
  stripe: {
    checkout: '/stripe/checkout/:amount?',
    return: '/stripe/return/:sessionId',
  },
  terms: '/terms',
}

export type RoutesType = typeof Routes
