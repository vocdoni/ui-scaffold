import { createContext, useContext, useState } from 'react'

const CensusContext = createContext(undefined)

export const CensusProvider = ({ children }) => {
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
