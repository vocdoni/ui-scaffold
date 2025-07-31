import { useMutation } from '@tanstack/react-query'
import { PublishedElection } from '@vocdoni/sdk'

export type CensusData = {
  orgMemberAuthFields: string[]
  orgMemberTwoFaFields: string[]
}

export type AuthFieldType = 'memberNumber' | 'name' | 'surname' | 'nationalId' | 'birthDate'
export type TwoFaFieldType = 'email' | 'phone'

export type CSPFormData = {
  memberNumber?: string
  name?: string
  surname?: string
  nationalId?: string
  birthDate?: string
  email?: string
  phone?: string
} & Record<string, string>

export type CSPStep0FormData = CSPFormData

export type CSPStep0RequestData = CSPFormData

export type Step0Response = {
  authToken: string
}

export type Step1Response = {
  authToken: string
}

export type TwoFactorResponse<T extends number> = T extends 0 ? Step0Response : T extends 1 ? Step1Response : unknown

export const useTwoFactorAuth = <T extends number>(process: PublishedElection, step: T) =>
  useMutation<TwoFactorResponse<T>, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await fetch(`${process.census.censusURI}/auth/${step}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error((await response.json()).error)
      }
      return response.json()
    },
  })
