import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronSelectorVertical, Plus } from '@untitled-ui/icons-react'
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
    <Popover placement={placement}>
      <PopoverTrigger>
        <Box
          display='flex'
          alignItems='center'
          gap={2}
          justifyContent='space-between'
          _hover={{ cursor: 'pointer' }}
          {...props}
        >
          {reduced ? (
            <Icon as={LuGalleryVerticalEnd} boxSize={4} />
          ) : (
            <>
              <HStack>
                <Icon as={LuGalleryVerticalEnd} boxSize={4} ml={2} mr={2} />
                <Flex flexDirection={'column'} justifyContent={'start'} gap={0.5} fontSize={'sm'}>
                  <OrganizationName lineHeight={'14px'} fontWeight={500} maxW={'165px'} isTruncated />
                  <Text
                    as={'span'}
                    lineHeight={'14px'}
                    color='dashboard.org_switcher.subscription_plan'
                    fontSize={'xs'}
                    maxW={'165px'}
                    isTruncated
                  >
                    {subscription.plan.name.split(' ')[0]}
                  </Text>
                </Flex>
              </HStack>
              <ChevronSelectorVertical width='16' height='16' color='dashboard.org_switcher.icon' />
            </>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent zIndex={100} maxW='229px'>
        <PopoverHeader minH={'unset'}>
          <Text size='xs' mb={2} fontWeight={600} color={'dashboard.org_switcher.number'}>
            {t('organizations', { defaultValue: 'Organizations' })} ({organizations.length})
          </Text>
          <HStack>
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
            <OrganizationName lineHeight={'14px'} fontWeight={500} maxW={'80px'} isTruncated />
            <Tag colorScheme='gray' ml='auto'>
              {t('current', { defaultValue: 'Current' })}
            </Tag>
          </HStack>
        </PopoverHeader>
        <PopoverBody minH={'unset'}>
          <Button
            as={ReactRouterLink}
            variant='unstyled'
            colorScheme='gray'
            display={'flex'}
            justifyContent={'start'}
            gap={2}
            w='full'
            minH={'0'}
            aria-label={t('create_org.title')}
            to={Routes.dashboard.organizationCreate}
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
            {t('add_new_org', { defaultValue: 'Add a new organization' })}
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
