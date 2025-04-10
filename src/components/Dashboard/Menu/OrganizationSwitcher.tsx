import { Button, Flex, HStack, Icon, PopoverBody, PopoverFooter, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { Plus } from '@untitled-ui/icons-react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuGalleryVerticalEnd } from 'react-icons/lu'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useQueryClient } from 'wagmi'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys } from '~components/Auth/useAuthProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { Organization, useProfile } from '~src/queries/account'

type SelectOption = {
  value: string
  label: string
  organization: Organization
}

export const OrganizationSwitcher = ({ ...props }) => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  const [selectedOrg, setSelectedOrg] = useState<string | null>(localStorage.getItem(LocalStorageKeys.SignerAddress))
  const [names, setNames] = useState<Record<string, string>>({})
  const { signerRefresh } = useAuth()
  const queryClient = useQueryClient()
  const { client } = useClient()
  const { reduced } = useContext(DashboardLayoutContext)
  const { subscription } = useSubscription()
  const variant = useBreakpointValue({
    base: false,
    md: true,
  })

  const placement = variant ? 'right-end' : 'auto'

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
  if (!subscription) return
  return (
    <>
      <PopoverBody minH={'unset'}>
        <Text size='xs' fontWeight={600} color={'dashboard.org_switcher.number'} px={1.5} py={2}>
          {t('organizations', { defaultValue: 'Organizations' })} ({organizations.length})
        </Text>
        <HStack p={2} mb={1}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            border='var(--border)'
            w='22px'
            h='22px'
            borderRadius='xs'
          >
            <Icon as={LuGalleryVerticalEnd} boxSize={4} ml={2} mr={2} />
          </Flex>
          <OrganizationName fontSize={'14px'} lineHeight={'14px'} fontWeight={500} maxW={'80px'} isTruncated />
          <Tag colorScheme='gray' ml='auto'>
            {t('current', { defaultValue: 'Current' })}
          </Tag>
        </HStack>
      </PopoverBody>
      <PopoverFooter minH={'unset'}>
        <Button
          as={ReactRouterLink}
          aria-label={t('create_org.title')}
          to={Routes.dashboard.organizationCreate}
          variant={'transparent'}
          colorScheme='gray'
          w='full'
          px={2}
          py={1.5}
          h={'unset'}
          borderRadius={'xs'}
          mt={1}
          sx={{ '& span:nth-of-type(2)': { marginLeft: 'auto' } }}
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            border='var(--border)'
            w='22px'
            h='22px'
            borderRadius='xs'
          >
            <Icon as={Plus} boxSize={4} ml={2} mr={2} />
          </Flex>
          <Text as={'span'} h='unset' fontWeight={'bold'} size={'sm'}>
            {t('add_new_org', { defaultValue: 'Add a new organization' })}
          </Text>
        </Button>
      </PopoverFooter>
    </>
  )
}
