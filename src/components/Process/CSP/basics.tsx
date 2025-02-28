import { useMutation } from '@tanstack/react-query'
import { PublishedElection } from '@vocdoni/sdk'

export type CSPStep0FormData = {
  participantNo: string
  contact?: string
  password?: string
}

export type CSPStep0RequestData = Omit<CSPStep0FormData, 'contact'> & {
  email?: string
  phone?: string
}

export type Step0Response = {
  authToken: string
}

export type Step1Response = {
  tokenR: string
}

export type TwoFactorResponse<T extends number> = T extends 0 ? Step0Response : T extends 1 ? Step1Response : unknown

export const useTwoFactorAuth = <T extends number>(process: PublishedElection, step: T) =>
  useMutation<TwoFactorResponse<T>, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await fetch(`${process.census.censusURI}/${process.id}/auth/${step}`, {
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
