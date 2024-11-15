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
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    process: '/admin/process/:id',
    processes: '/admin/processes/:page?/:status?',
    profile: '/admin/profile',
    team: '/admin/team',
  },
  faucet: '/faucet',
  navbar: {
    useCases: '/usecases',
    features: '/features',
    pricing: '/pricing',
    demos: '/demos',
    contactUs: '/contactus',
  },
  organization: '/organization/:address',
  privacy: '/privacy',
  processes: {
    create: '/admin/processes/create',
    view: '/processes/:id',
  },
  stripe: {
    checkout: '/stripe/checkout/:amount?',
    return: '/stripe/return/:sessionId',
  },
  terms: '/terms',
}

export type RoutesType = typeof Routes
