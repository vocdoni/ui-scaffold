import { createContext, useContext, useState } from 'react'

const MembersContext = createContext(undefined)

export function MembersProvider({ children }) {
  const [jobID, setJobID] = useState(null)

  return <MembersContext.Provider value={{ jobID, setJobID }}>{children}</MembersContext.Provider>
}

export function useMembers() {
  const context = useContext(MembersContext)
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider')
  }
  return context
}
