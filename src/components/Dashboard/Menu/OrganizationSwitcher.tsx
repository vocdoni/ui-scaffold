import { Box } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { Select } from 'chakra-react-select'
import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'wagmi'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys } from '~components/Auth/useAuthProvider'
import { Organization, useProfile } from '~src/queries/account'

type SelectOption = {
  value: string
  label: string
  organization: Organization
}

export const OrganizationSwitcher = () => {
  const { data: profile } = useProfile()
  const [selectedOrg, setSelectedOrg] = useState<string | null>(localStorage.getItem(LocalStorageKeys.SignerAddress))
  const { signerRefresh } = useAuth()
  const client = useQueryClient()

  const organizations = useMemo(() => {
    if (!profile?.organizations) return []
    return profile.organizations.map((org) => ({
      value: org.organization.address,
      label: org.organization.address,
      organization: org.organization,
    }))
  }, [profile])

  // Set first organization as default if none selected
  useEffect(() => {
    if (organizations.length && !selectedOrg) {
      const firstOrgAddress = organizations[0].value
      setSelectedOrg(firstOrgAddress)
      localStorage.setItem(LocalStorageKeys.SignerAddress, firstOrgAddress)
    }
  }, [organizations, selectedOrg])

  const handleOrgChange = async (option: SelectOption | null) => {
    if (!option) return
    setSelectedOrg(option.value)
    localStorage.setItem(LocalStorageKeys.SignerAddress, option.value)
    // clear all query client query cache
    client.clear()
    // refresh signer
    await signerRefresh()
  }

  return organizations.length > 1 ? (
    <Box mb={2} px={3.5}>
      <Select
        value={organizations.find((org) => org.value === selectedOrg)}
        onChange={handleOrgChange}
        options={organizations}
        size='sm'
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: '100%',
          }),
        }}
      />
    </Box>
  ) : (
    <OrganizationName mb={2} px={3.5} />
  )
}
