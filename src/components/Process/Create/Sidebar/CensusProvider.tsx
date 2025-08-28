import { createContext, PropsWithChildren, useContext, useState } from 'react'

type CensusContextType =
  | {
      maxCensusSize: number | null
      setMaxCensusSize: React.Dispatch<React.SetStateAction<number | null>>
    }
  | undefined

const CensusContext = createContext<CensusContextType>(undefined)

export const CensusProvider = ({ children }: PropsWithChildren) => {
  const [maxCensusSize, setMaxCensusSize] = useState<number | null>(null)

  return <CensusContext.Provider value={{ maxCensusSize, setMaxCensusSize }}>{children}</CensusContext.Provider>
}

export function useCensus() {
  const context = useContext(CensusContext)
  if (!context) {
    throw new Error('useCensus must be used within a CensusProvider')
  }
  return context
}
