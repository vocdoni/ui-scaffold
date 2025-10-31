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
  contact: 'https://www.vocdoni.io/contact',
  dashboard: {
    base: '/admin',
    organization: '/admin/organization',
    organizationCreate: '/admin/organization/create', // Organization create with dashboard layout
    process: '/admin/process/:id',
    processes: {
      base: '/admin/processes',
      all: '/admin/processes/all/:page?/:status?',
      ended: '/admin/processes/ended/:page?/ENDED',
      drafts: '/admin/processes/drafts/:page?',
    },
    profile: '/admin/profile',
    memberbase: {
      base: '/admin/memberbase',
      members: '/admin/memberbase/members/:page?',
      groups: '/admin/memberbase/groups',
    },
    settings: {
      base: '/admin/settings',
      organization: '/admin/settings/organization',
      team: '/admin/settings/team',
      subscription: '/admin/settings/subscription',
      support: '/admin/settings/support',
    },
  },
  plans: '/plans',
  organization: '/organization/:address',
  processes: {
    create: '/admin/processes/create/:groupId?',
    view: '/processes/:id',
  },
  usecases: {
    base: '/use-cases',
    view: '/use-cases/:lang?/:case?',
  },
}

export type RoutesType = typeof Routes
