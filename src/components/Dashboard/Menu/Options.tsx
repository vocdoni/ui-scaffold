import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { HiHome, HiSquares2X2 } from 'react-icons/hi2'
import { IoIosWallet } from 'react-icons/io'
import { MdPeopleAlt, MdSpeakerNotes, MdWavingHand } from 'react-icons/md'
import { RiOrganizationChart, RiPriceTag2Fill, RiSpeakFill } from 'react-icons/ri'
import { matchPath, useLocation } from 'react-router-dom'
import { DropdownColorModeSwitcherItem } from '~components/Layout/ColorModeSwitcher'
import LanguagesListAccordion from '~components/Navbar/LanguagesList'
import { Routes } from '~src/router/routes'
import { DashboardMenuItem } from './Item'
import { OrganizationSwitcher } from './OrganizationSwitcher'

type MenuItemBase = {
  component?: JSX.Element
  label?: any
  icon?: IconType
  route?: string
  styles?: any
}

type MenuSection = {
  title: string
  items: MenuItemBase[]
  desktop?: boolean
}

export const DashboardMenuOptions = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isDesktop] = useMediaQuery('(min-width: 80em)')
  // const { subscription } = useSubscription()

  const menuItems: MenuSection[] = [
    {
      title: 'General',
      items: [
        {
          label: t('organization.dashboard'),
          icon: HiHome,
          route: Routes.dashboard.base,
        },
        {
          label: t('voting_processes'),
          icon: HiSquares2X2,
          route: Routes.dashboard.processes,
        },
      ],
      desktop: true,
    },
    {
      title: 'Settings',
      items: [
        { label: t('organization.organization'), icon: RiOrganizationChart, route: Routes.dashboard.organization },
        { label: t('team.title'), icon: MdPeopleAlt, route: Routes.dashboard.team },
        { label: t('subscription.title'), icon: IoIosWallet, route: Routes.dashboard.subscription },
      ],
      desktop: true,
    },
    {
      title: 'Subscription',
      items: [
        {
          label: (
            <Flex w='100%' justify='space-between' align='center'>
              <Text>Free Plan</Text>
              {/* <Text color='gray'>{subscription.plan.organization.maxCensus} max</Text> */}
            </Flex>
          ),
          icon: RiPriceTag2Fill,
          route: Routes.plans,
          styles: { as: 'span', _hover: { bg: 'none' }, _active: { bg: 'nonr' } },
        },
      ],
      desktop: true,
    },
    {
      title: 'Others',
      items: [
        { label: t('profile.title'), icon: UserSquare, route: Routes.dashboard.profile },
        { label: t('menu.documentation'), icon: Paperclip, route: 'https://developer.vocdoni.io/' },
        { label: t('contact_us'), icon: MdSpeakerNotes, route: 'https://developer.vocdoni.io/' },
        { label: t('feedback'), icon: RiSpeakFill, route: 'https://developer.vocdoni.io/' },
        { label: t('help_docs'), icon: MdWavingHand, route: 'https://developer.vocdoni.io/' },
        { component: <LanguagesListAccordion fontWeight={'normal'} variant='transparent' m='default' p='default' /> },
        { component: <DropdownColorModeSwitcherItem /> },
        { label: 'Logout', icon: LogOut01, route: Routes.dashboard.team },
        { label: 'Terms', route: Routes.terms },
        { label: 'Privacy', route: Routes.privacy },
      ],
      desktop: false,
    },
  ]
  // if (!subscription) return
  return (
    <Box>
      <Text color={'gray'} mb={2}>
        Workspace
      </Text>
      <OrganizationSwitcher />
      <Box py={4}>
        {menuItems
          .filter((el) => !isDesktop || el.desktop)
          .map((el, idx) => (
            <Box key={idx} mb={4}>
              <Text color={'gray'}>{el.title}</Text>
              {el.items.map((item, index) => (
                <>
                  {item.component ? (
                    item.component
                  ) : (
                    <DashboardMenuItem
                      key={index}
                      label={item.label}
                      route={item.route}
                      icon={item.icon}
                      isActive={Boolean(matchPath({ path: item.route || '', end: true }, location.pathname))}
                      {...item.styles}
                    />
                  )}
                </>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  )
}
