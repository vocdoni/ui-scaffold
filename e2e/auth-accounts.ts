export type AuthAccount = {
  email: string
  password: string
}

export type AuthAccounts = Record<string, AuthAccount>

export const authAccounts: AuthAccounts = {
  chromium: {
    email: 'elboletaire+qa@vocdoni.org',
    password: '123456789',
  },
  firefox: {
    email: 'elboletaire+qa1@vocdoni.org',
    password: '123456789',
  },
}
