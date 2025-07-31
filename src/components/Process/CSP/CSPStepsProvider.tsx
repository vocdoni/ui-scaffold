import { createContext, useContext, useState } from 'react'
import { CensusData, AuthFieldType, TwoFaFieldType } from './basics'

type CspAuthStep = {
  step: number
  name: string
}

type CspAuthContextState = {
  steps: CspAuthStep[]
  currentStep: number
  setCurrentStep: (step: number) => void
  authData: Record<string, any>
  setAuthData: (data: Record<string, any>) => void
  censusData: CensusData | null
  authFields: AuthFieldType[]
  twoFaFields: TwoFaFieldType[]
}

const CspAuthContext = createContext<CspAuthContextState | undefined>(undefined)

export const CspAuthProvider = ({
  children,
  censusData,
}: {
  children: React.ReactNode
  censusData?: CensusData | null
}) => {
  const [steps] = useState<CspAuthStep[]>([
    { step: 0, name: 'Step 0' },
    { step: 1, name: 'Step 1' },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [authData, setAuthData] = useState<Record<string, any>>({})

  // Process census data to determine auth fields
  const authFields = (censusData?.orgMemberAuthFields || []) as AuthFieldType[]
  const twoFaFields = (censusData?.orgMemberTwoFaFields || []) as TwoFaFieldType[]

  return (
    <CspAuthContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        authData,
        setAuthData,
        censusData,
        authFields,
        twoFaFields,
      }}
    >
      {children}
    </CspAuthContext.Provider>
  )
}

export const useCspAuthContext = () => {
  const context = useContext(CspAuthContext)
  if (!context) {
    throw new Error('useCspAuthContext must be used within an CspAuthProvider')
  }
  return context
}
