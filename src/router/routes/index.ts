export const Routes = {
  root: '/',
  auth: {
    signIn: '/account/signin',
    signUp: '/account/signup',
    recovery: '/account/recovery',
    verify: '/account/verify',
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
