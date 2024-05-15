import { Icon, VStack } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { HiOutlineClipboard } from 'react-icons/hi2'
import { PiGauge, PiUserFocus } from 'react-icons/pi'
import MenuButton, { NavbarLink } from '~components/Layout/NavbarLink'

const OrganizationDashboardMenu = () => {
  // links definition must be inside the component in order for i18n to properly work
  const links: NavbarLink[] = [
    {
      name: <Trans i18nKey='organization.menu.dashboard'>Dashboard</Trans>,
      to: '/organization',
      icon: <Icon as={PiGauge} />,
    },
    {
      name: <Trans i18nKey='organization.menu.votings'>Votings</Trans>,
      to: '/organization/votings',
      icon: <Icon as={HiOutlineClipboard} />,
    },
    {
      name: <Trans i18nKey='organization.menu.edit_my_organization'>My entity</Trans>,
      to: '/organization/edit',
      icon: <Icon as={PiUserFocus} />,
    },
  ]

  return (
    <VStack>
      {links.map(({ name, to, icon }, key) => (
        <MenuButton key={key} name={name} to={to} icon={icon} />
      ))}
    </VStack>
  )
}

export default OrganizationDashboardMenu
