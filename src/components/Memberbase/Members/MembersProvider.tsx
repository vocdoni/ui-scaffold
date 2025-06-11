import { useQuery } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { createContext, useContext, useState } from 'react'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'

const MembersContext = createContext(undefined)

export function MembersProvider({ children }) {
  const [jobID, setJobID] = useState(null)
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  const jobProgress = (options?) => {
    const enabled = Boolean(jobID)

    const url = ApiEndpoints.OrganizationMembersImport.replace(
      '{address}',
      enforceHexPrefix(organization.address)
    ).replace('{jobID}', jobID)

    return useQuery<{ progress: number; added: number; total: number }, Error>({
      enabled,
      queryKey: ['importProgress', jobID],
      queryFn: () => bearedFetch<{ progress: number; added: number; total: number }>(url, { ...options }),
      refetchInterval: (query) => {
        const data = query.state.data
        if (!data || data.progress < 100) return 2000
        return false
      },
      refetchOnWindowFocus: false,
    })
  }

  return <MembersContext.Provider value={{ jobID, setJobID, jobProgress }}>{children}</MembersContext.Provider>
}

export function useMembers() {
  const context = useContext(MembersContext)
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider')
  }
  return context
}
