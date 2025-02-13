export const Routes = {
  root: '/',
  auth: {
    acceptInvite: '/account/invite',
    organizationCreate: '/account/create-organization', // Organization create with account layout
    signIn: '/account/signin',
    signUp: '/account/signup',
    recovery: '/account/password',
    verify: '/account/verify',
    passwordReset: '/account/password/reset',
  },
  calculator: '/calculator',
  contact: 'https://www.vocdoni.io/contact',
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    organizationCreate: '/admin/organization/create', // Organization create with dashboard layout
    process: '/admin/process/:id',
    processes: '/admin/processes/:page?/:status?',
    profile: '/admin/profile',
    team: '/admin/team',
    subscription: '/admin/subscription',
  },
  plans: '/plans',
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
  usecases: {
    base: '/usecases',
  },
}

export type RoutesType = typeof Routes
