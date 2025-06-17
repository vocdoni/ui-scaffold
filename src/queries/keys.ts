export const QueryKeys = {
  organization: {
    elections: (address?: string, params?: { page?: number; status?: string }) =>
      ['organizations', 'elections', address, params].filter(Boolean),
    info: (address?: string) => ['organizations', 'info', address].filter(Boolean),
    users: (address?: string) => ['organizations', 'users', address].filter(Boolean),
    names: ['organizations', 'names'],
    pendingUsers: (address?: string) => ['organizations', 'users', 'pending', address].filter(Boolean),
    roles: ['organizations', 'roles'],
    types: ['organizations', 'types'],
    subscription: (address?: string) => ['organizations', 'subscription', address].filter(Boolean),
    meta: (address?: string) => ['organizations', 'meta', address].filter(Boolean),
    members: (address?: string) => ['organizations', 'members', address].filter(Boolean),
    groups: (address?: string) => ['organizations', 'groups', address].filter(Boolean),
  },
  plans: ['plans'],
  profile: ['profile'],
}
