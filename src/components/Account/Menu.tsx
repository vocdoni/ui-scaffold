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
  Text,
} from '@chakra-ui/react'
import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
import { HiDotsVertical, HiOutlineDotsHorizontal } from 'react-icons/hi'
import { MdHelpCenter, MdSpeakerNotes } from 'react-icons/md'
import { RiSpeakFill } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { DropdownColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import LanguagesListAccordion from '~components/Navbar/LanguagesList'
import { useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'

const AccountMenu: React.FC<BoxProps> = (props) => {
  const { logout } = useAuth()
  const { data: profile, isLoading } = useProfile()
  const org = localStorage.getItem('signerAddress')

  const selectedOrg = profile?.organizations.filter((el) => el.organization.address === org)

  if (isLoading || !selectedOrg) {
    return (
      <Box {...props}>
        <Spinner minH='35px' minW='35px' />
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
              rightIcon={
                isOpen ? <Icon as={HiDotsVertical} boxSize={4} /> : <Icon as={HiOutlineDotsHorizontal} boxSize={4} />
              }
              aria-label='User menu'
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              variant={'unstyled'}
              w='full'
              bgColor={'account_menu_bg.light'}
              p={2}
              minH={'50px'}
              _dark={{ bg: 'account_menu_bg.dark' }}
            >
              <Text fontSize='xs' maxW={'180px'} w='fit-content' fontWeight='light' isTruncated>
                {profile.email}
              </Text>
              <Text fontSize='xs' maxW={'180px'} w='fit-content' textTransform={'capitalize'} fontWeight={'bold'}>
                {selectedOrg[0].role}
              </Text>
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
              <MenuItem as={RouterLink} to='' target='_blank' closeOnSelect={true}>
                <Icon as={MdSpeakerNotes} />
                <Trans i18nKey='menu.contact_us'>Contact us</Trans>
              </MenuItem>
              <MenuItem as={RouterLink} to='' target='_blank' closeOnSelect={true}>
                <Icon as={RiSpeakFill} />
                <Trans i18nKey='menu.feedback'>Give Feedback</Trans>
              </MenuItem>
              <MenuItem as={RouterLink} to='' target='_blank' closeOnSelect={true}>
                <Icon as={MdHelpCenter} />
                <Trans i18nKey='menu.help'>Help & Docs</Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem as='div' role='button' tabIndex={0} closeOnSelect={false}>
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
