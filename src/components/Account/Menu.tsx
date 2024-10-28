import { Avatar, Box, BoxProps, IconButton, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'

const AccountMenu: React.FC = (props: BoxProps) => {
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
          {...props}
        />
        <MenuList>
          <MenuItem as={RouterLink} to={Routes.dashboard.profile}>
            <Trans i18nKey='profile'>Profile</Trans>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Trans i18nKey='logout'>Logout</Trans>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AccountMenu
