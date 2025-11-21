import { useMutation } from '@tanstack/react-query'
import { PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'

export type CensusData = {
  authFields: string[]
  twoFaFields: string[]
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

export const useTwoFactorAuth = <T extends number>(process: PublishedElection, step: T) => {
  const { t, i18n } = useTranslation()
  return useMutation<TwoFactorResponse<T>, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await fetch(`${process.census.censusURI}/auth/${step}?lang=${i18n.language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const { code, error } = await response.json()

        const translatedMessage =
          code === 40001
            ? t('csp.errors.participant_not_found', {
                defaultValue: 'The voter is not listed in the census, or the provided credentials are incorrect.',
              })
            : error

        throw new Error(translatedMessage)
      }
      return response.json()
    },
  })
}
