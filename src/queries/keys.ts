export const QueryKeys = {
  organization: {
    elections: (address?: string, params?: { page?: number; status?: string }) =>
      ['organizations', 'elections', address, params].filter(Boolean),
    info: (address?: string) => ['organizations', 'info', address].filter(Boolean),
    members: (address?: string) => ['organizations', 'members', address].filter(Boolean),
    pendingMembers: (address?: string) => ['organizations', 'members', 'pending', address].filter(Boolean),
    roles: ['organizations', 'roles'],
    subscription: (address?: string) => ['organizations', 'subscription', address].filter(Boolean),
  },
  census: {
    list: (orgAddress?: string) => ['census', 'list', orgAddress].filter(Boolean),
    info: (id?: string) => ['census', 'info', id].filter(Boolean),
    published: (id?: string) => ['census', 'published', id].filter(Boolean),
  },
  plans: ['plans'],
  profile: ['profile'],
}
