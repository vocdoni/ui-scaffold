import {
  Avatar,
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { ImProfile } from 'react-icons/im'
import { TbLogout } from 'react-icons/tb'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'

const AccountMenu: React.FC<BoxProps> = (props) => {
  const { logout } = useAuth()
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <Box {...props}>
        <Spinner />
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={
            <Avatar
              name={`${profile.firstName} ${profile.lastName}`}
              src={profile.organizations[0]?.organization.logo || ''}
              size='sm'
            />
          }
          size='sm'
          variant='outline'
          aria-label='User menu'
        />
        <MenuList>
          <MenuItem as={RouterLink} to={Routes.dashboard.profile}>
            <ImProfile size={16} />
            <Trans i18nKey='profile'>Profile</Trans>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>
            <TbLogout size={20} />
            <Trans i18nKey='logout'>Logout</Trans>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AccountMenu
