import {
  Avatar,
  Box,
  BoxProps,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
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
          variant='link'
          aria-label='User menu'
        />
        <MenuList>
          <MenuItem as={RouterLink} to={Routes.dashboard.profile}>
            <Icon as={UserSquare} />
            <Trans i18nKey='profile.title'>Profile</Trans>
          </MenuItem>
          <MenuItem as={RouterLink} to='https://developer.vocdoni.io/' target='_blank'>
            <Icon as={Paperclip} />
            <Trans i18nKey='menu.documentation'>Documentation</Trans>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>
            <Icon as={LogOut01} />
            <Trans i18nKey='logout'>Logout</Trans>
          </MenuItem>
          <MenuDivider />
          <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.terms}>
            <Trans i18nKey='menu.terms'>Terms</Trans>
          </MenuItem>
          <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.privacy}>
            <Trans i18nKey='menu.privacy'>Privacy</Trans>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AccountMenu
