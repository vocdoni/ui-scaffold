export const QueryKeys = {
  organization: {
    info: (address?: string) => ['organizations', 'info', address].filter(Boolean),
  },
}
