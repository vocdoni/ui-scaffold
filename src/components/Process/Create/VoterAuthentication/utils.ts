export type TwoFAMethod = 'email' | 'sms' | 'voter_choice'

export type VoterAuthFormData = {
  credentials: string[]
  use2FA: boolean
  use2FAMethod: TwoFAMethod
}

export type StepCompletionState = {
  step1Completed: boolean
  step2Completed: boolean
}

export const getTwoFaFields = (method: TwoFAMethod): string[] => {
  switch (method) {
    case 'email':
      return ['email']
    case 'sms':
      return ['phone']
    case 'voter_choice':
      return ['email', 'phone']
  }
}
