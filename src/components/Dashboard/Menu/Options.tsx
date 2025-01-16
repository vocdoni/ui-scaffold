import { Box, Collapse } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { Select } from 'chakra-react-select'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { generatePath, matchPath, useLocation } from 'react-router-dom'
import { useQueryClient } from 'wagmi'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys } from '~components/Auth/useAuthProvider'
import { Organization, useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'
import { DashboardMenuItem } from './Item'

type MenuItem = {
  label: string
  icon?: any
  route?: string
  children?: MenuItem[]
}

export const DashboardMenuOptions = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [openSection, setOpenSection] = useState<string | null>(null)
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

  type SelectOption = {
    value: string
    label: string
    organization: Organization
  }

  const handleOrgChange = async (option: SelectOption | null) => {
    if (!option) return
    setSelectedOrg(option.value)
    localStorage.setItem(LocalStorageKeys.SignerAddress, option.value)
    // clear all query client query cache
    client.clear()
    // refresh signer
    await signerRefresh()
  }

  const menuItems: MenuItem[] = [
    // {
    //   label: t('organization.dashboard'),
    //   icon: FaHouse,
    //   route: Routes.dashboard.base,
    // },
    {
      label: t('voting_processes'),
      icon: HiSquares2X2,
      children: [
        { label: t('all'), route: generatePath(Routes.dashboard.processes, { page: 1 }) },
        { label: t('active'), route: generatePath(Routes.dashboard.processes, { status: 'ready', page: 1 }) },
        { label: t('finished'), route: generatePath(Routes.dashboard.processes, { status: 'results', page: 1 }) },
        // { label: t('draft'), route: '#draft' },
      ],
    },
    // {
    //   label: t('organization.census'),
    //   icon: GiHamburgerMenu,
    //   route: '#census',
    // },
    // {
    //   label: t('user_management'),
    //   icon: HiMiniPencil,
    //   route: '#user-management',
    // },
    {
      label: t('settings'),
      icon: IoIosSettings,
      children: [
        { label: t('organization.organization'), route: Routes.dashboard.organization },
        { label: t('team.title'), route: Routes.dashboard.team },
        // { label: t('billing'), route: '#billing' },
        { label: t('subscription.title'), route: Routes.dashboard.subscription },
        { label: t('profile.title'), route: Routes.dashboard.profile },
      ],
    },
    // {
    //   label: t('help_and_support'),
    //   icon: FaPhoneAlt,
    //   route: '#support',
    // },
  ]

  // Check if any child route is active, and open its section
  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) => matchPath({ path: child.route || '', end: true }, location.pathname))
      ) {
        setOpenSection((prev) => (prev !== item.label ? item.label : prev))
      }
    })
  }, [location.pathname])

  const handleToggle = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label))
  }

  return (
    <Box>
      {organizations.length > 1 ? (
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
      )}

      {menuItems.map((item, index) => (
        <Box key={index}>
          {item.children ? (
            <>
              <DashboardMenuItem
                label={item.label}
                icon={item.icon}
                route={item.route}
                isOpen={openSection === item.label}
                isActive={item.children.some((child) =>
                  matchPath({ path: child.route || '', end: true }, location.pathname)
                )}
                onToggle={() => handleToggle(item.label)}
                hasChildren
              />
              <Collapse in={openSection === item.label}>
                <Box pl={6}>
                  {item.children.map((child, childIndex) => (
                    <DashboardMenuItem
                      key={childIndex}
                      label={child.label}
                      route={child.route}
                      icon={null}
                      isActive={Boolean(matchPath({ path: child.route || '', end: true }, location.pathname))}
                    />
                  ))}
                </Box>
              </Collapse>
            </>
          ) : (
            <DashboardMenuItem
              label={item.label}
              route={item.route}
              icon={item.icon}
              isActive={Boolean(matchPath({ path: item.route || '', end: true }, location.pathname))}
            />
          )}
        </Box>
      ))}
    </Box>
  )
}
