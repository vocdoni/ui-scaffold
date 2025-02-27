import { Avatar, Box, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Select } from 'chakra-react-select'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'wagmi'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys } from '~components/Auth/useAuthProvider'
import { useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'
import { orgSwitcherSelectStyles } from '~theme/orgSwitcherSelectStyles'

import { AddIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { chakraComponents, OptionProps } from 'chakra-react-select'

type SelectOption = {
  value: string
  label: string
  icon?: any
  avatar?: any
}
const CustomOption = (props: OptionProps<SelectOption>) => (
  <chakraComponents.Option {...props}>
    <Flex alignItems='center'>
      {props.label === 'Add new organization' ? (
        <AddIcon ml={1.5} mr={3} boxSize={3} />
      ) : (
        <Avatar src={props.data.icon} size='xs' mr={2} />
      )}
      <Text maxW='140px' fontSize={'xs'} isTruncated>
        {props.data.label}
      </Text>
    </Flex>
  </chakraComponents.Option>
)

export const OrganizationSwitcher = () => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  const [selectedOrg, setSelectedOrg] = useState<string | null>(localStorage.getItem(LocalStorageKeys.SignerAddress))
  const [names, setNames] = useState<Record<string, string>>({})
  const { signerRefresh } = useAuth()
  const queryClient = useQueryClient()
  const { client } = useClient()
  const navigate = useNavigate()

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
      avatar: profile.organizations[0]?.organization.logo || '',
    }))
  }, [profile, names])

  useEffect(() => {
    organizations.push({
      value: 'Add new organization',
      label: 'Add new organization',
      avatar: null,
      organization: null,
    })
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
    if (option.label === 'Add new organization') {
      navigate(Routes.dashboard.organizationCreate)
      return
    }
    setSelectedOrg(option.value)
    localStorage.setItem(LocalStorageKeys.SignerAddress, option.value)
    // clear all query client query cache
    queryClient.clear()
    // refresh signer
    await signerRefresh()
  }

  return (
    <Box mb={3} px={3.5} display='flex' alignItems='center' gap={2} justifyContent='space-between'>
      <Select
        value={organizations.find((org) => org.value === selectedOrg)}
        onChange={handleOrgChange}
        options={organizations}
        size='sm'
        chakraStyles={orgSwitcherSelectStyles}
        components={{ Option: CustomOption }}
      />
    </Box>
  )
}
