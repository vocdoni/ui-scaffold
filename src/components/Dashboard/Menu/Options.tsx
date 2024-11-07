import { Box, Button, Collapse } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { matchPath, useLocation } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import { PricingModal } from '../PricingModal'
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
  const [modal, setModal] = useState(false)

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
        { label: t('all'), route: Routes.dashboard.processes },
        { label: t('active'), route: '#active' },
        { label: t('finished'), route: '#finished' },
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
        { label: t('team'), route: Routes.dashboard.team },
        // { label: t('billing'), route: '#billing' },
        // { label: t('subscription'), route: '#subscription' },
        { label: t('profile'), route: Routes.dashboard.profile },
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
      <PricingModal isOpenModal={modal} onCloseModal={() => setModal(false)} />
      <Button onClick={() => setModal(true)}>Open Modal</Button>
      <OrganizationName color='text.secondary' mb={2.5} />
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
