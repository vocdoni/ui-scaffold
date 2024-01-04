import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Icon, Link, List, ListItem, Menu, MenuButton, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import Logo from '~components/Layout/Logo'
import { LanguagesMenu } from './LanguagesList'
import MenuDropdown from './Menu'

const Navbar = () => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()
  const { openConnectModal } = useConnectModal()

  return (
    <>
      <Logo />

      <List as='nav' display='flex' alignItems='center' gap={4}>
        {isConnected && (
          <ListItem>
            <Link
              as={ReactRouterLink}
              to='/processes/create'
              variant='rounded'
              colorScheme='primary'
              aria-label={t('menu.new_process')}
              title={t('menu.new_process')}
              px={{ base: 3.5, sm2: 4 }}
            >
              <AddIcon boxSize={3} />
              <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
                {t('menu.new_process')}
              </Text>
            </Link>
          </ListItem>
        )}

        {account && account?.account?.name?.default.length > 0 && (
          <ListItem>
            <Link
              as={ReactRouterLink}
              to={`/organization/${ensure0x(account?.address)}`}
              variant='rounded'
              color='primary.main'
              aria-label={t('menu.my_org_aria_label')}
              title={t('menu.my_org_aria_label')}
              px={{ base: 3, sm2: 4 }}
            >
              <Icon as={MdHowToVote} />
              <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
                {t('menu.my_org')}
              </Text>
            </Link>
          </ListItem>
        )}

        {!isConnected && (
          <>
            <ListItem>
              <Button
                variant='rounded'
                color='primary.main'
                onClick={() => {
                  if (openConnectModal) openConnectModal()
                }}
              >
                {t('menu.login').toString()}
              </Button>
            </ListItem>

            <ListItem>
              <LanguagesMenu />
            </ListItem>
          </>
        )}
        {isConnected && (
          <ListItem>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    aria-label={t('menu.languages_list')}
                    variant='rounded-ghost'
                    boxShadow={`${isOpen ? '' : 'var(--box-shadow-btn)'}`}
                    p={2}
                  >
                    <Box as='span' display='flex' alignItems='center'>
                      <Avatar
                        src={account?.account.avatar}
                        name={account?.account.name.default || account?.address}
                        size='xs'
                      />
                      {isOpen ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                    </Box>
                  </MenuButton>
                  <MenuDropdown />
                </>
              )}
            </Menu>
          </ListItem>
        )}
      </List>
    </>
  )
}

export default Navbar
