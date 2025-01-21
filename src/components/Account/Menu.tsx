import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text
} from '@chakra-ui/react'
import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { DropdownColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import LanguagesListAccordion from '~components/Navbar/LanguagesList'
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
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              leftIcon={
                <Avatar
                  name={`${profile.firstName} ${profile.lastName}`}
                  src={profile.organizations[0]?.organization.logo || ''}
                  size='sm'
                />
              }
              rightIcon={isOpen ? <ChevronUpIcon boxSize={4} mt='-4px' ml='5px' /> : <ChevronDownIcon boxSize={4} mt='-4px' ml='5px' />}
              aria-label='User menu'
              sx={{ '& > span': { m: 0 } }}
              display={'flex'}
              alignItems={'center'}
              variant={'unstyled'}
            >
              <Text ml='5px' fontSize='9px' fontWeight='200' style={{ transform: 'scale(0.9)' }}>{profile.email}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to={Routes.dashboard.profile} closeOnSelect={true}>
                <Icon as={UserSquare} />
                <Trans i18nKey='profile.title'>Profile</Trans>
              </MenuItem>
              <MenuItem as={RouterLink} to='https://developer.vocdoni.io/' target='_blank' closeOnSelect={true}>
                <Icon as={Paperclip} />
                <Trans i18nKey='menu.documentation'>Documentation</Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem closeOnSelect={false}>
                <LanguagesListAccordion />
              </MenuItem>
              <DropdownColorModeSwitcher />
              <MenuDivider />
              <MenuItem onClick={logout} closeOnSelect={true}>
                <Icon as={LogOut01} />
                <Trans i18nKey='logout'>Logout</Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.terms} closeOnSelect={true}>
                <Trans i18nKey='menu.terms'>Terms</Trans>
              </MenuItem>
              <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.privacy} closeOnSelect={true}>
                <Trans i18nKey='menu.privacy'>Privacy</Trans>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default AccountMenu
