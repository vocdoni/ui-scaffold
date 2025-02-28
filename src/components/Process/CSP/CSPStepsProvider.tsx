import { createContext, useContext, useState } from 'react'

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
}

const CspAuthContext = createContext<CspAuthContextState | undefined>(undefined)

export const CspAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [steps] = useState<CspAuthStep[]>([
    { step: 0, name: 'Step 0' },
    { step: 1, name: 'Step 1' },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [authData, setAuthData] = useState<Record<string, any>>({})

  return (
    <CspAuthContext.Provider value={{ steps, currentStep, setCurrentStep, authData, setAuthData }}>
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
