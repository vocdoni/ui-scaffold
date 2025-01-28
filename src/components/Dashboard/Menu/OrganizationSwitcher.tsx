import { Box, IconButton } from '@chakra-ui/react'
import { PlusSquare } from '@untitled-ui/icons-react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { Select } from 'chakra-react-select'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useQueryClient } from 'wagmi'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys } from '~components/Auth/useAuthProvider'
import { Organization, useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'

type SelectOption = {
  value: string
  label: string
  organization: Organization
}

export const OrganizationSwitcher = () => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  const [selectedOrg, setSelectedOrg] = useState<string | null>(localStorage.getItem(LocalStorageKeys.SignerAddress))
  const [names, setNames] = useState<Record<string, string>>({})
  const { signerRefresh } = useAuth()
  const queryClient = useQueryClient()
  const { client } = useClient()

  // Fetch organization names
  useEffect(() => {
    if (!profile?.organizations) return

    const fetchOrgNames = async () => {
      const names: Record<string, string> = {}
      for (const org of profile.organizations) {
        const address = org.organization.address
        try {
          const data = await client.fetchAccountInfo(address)
          names[address] = data?.account?.name?.default || address
        } catch (error) {
          console.error('Error fetching organization name:', error)
          names[address] = address
        }
      }
      setNames(names)
    }

    fetchOrgNames()
  }, [profile])

  // Populate organizations for the selector
  const organizations = useMemo(() => {
    if (!profile?.organizations) return []
    return profile.organizations.map((org) => ({
      value: org.organization.address,
      label: names[org.organization.address] || org.organization.address,
      organization: org.organization,
    }))
  }, [profile, names])

  // Set first organization as default if none selected
  useEffect(() => {
    if (organizations.length && !selectedOrg) {
      const firstOrgAddress = organizations[0].value
      setSelectedOrg(firstOrgAddress)
      localStorage.setItem(LocalStorageKeys.SignerAddress, firstOrgAddress)
    }
  }, [organizations, selectedOrg])

  // Sync selected organization with localStorage when profile changes
  useEffect(() => {
    if (!profile?.organizations) return

    const storedAddress = localStorage.getItem(LocalStorageKeys.SignerAddress)
    if (storedAddress !== selectedOrg) {
      setSelectedOrg(storedAddress)
    }
  }, [profile])

  const handleOrgChange = async (option: SelectOption | null) => {
    if (!option) return
    setSelectedOrg(option.value)
    localStorage.setItem(LocalStorageKeys.SignerAddress, option.value)
    // clear all query client query cache
    queryClient.clear()
    // refresh signer
    await signerRefresh()
  }

  return (
    <Box mb={2} px={3.5} display='flex' alignItems='center' gap={2} justifyContent='space-between'>
      {organizations.length > 1 ? (
        <Select
          value={organizations.find((org) => org.value === selectedOrg)}
          onChange={handleOrgChange}
          options={organizations}
          size='sm'
          chakraStyles={{
            container: (provided) => ({
              ...provided,
              width: '100%',
              minWidth: 0,
            }),
          }}
        />
      ) : (
        <OrganizationName mb={2} px={3.5} />
      )}
      <IconButton
        size='xs'
        as={Link}
        variant='solid'
        colorScheme='gray'
        aria-label={t('create_org.title')}
        icon={<PlusSquare />}
        to={Routes.dashboard.organizationCreate}
      />
    </Box>
  )
}
