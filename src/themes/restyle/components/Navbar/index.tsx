import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, Icon, Link, List, ListItem, Menu, MenuButton, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import Logo from '~components/Layout/Logo'
import { LanguagesMenu } from './LanguagesList'
import MenuDropdown from './Menu'

const Navbar = () => {
  const location = useLocation()
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()
  const { openConnectModal } = useConnectModal()

  return (
    <Flex
      as='nav'
      className='site-wrapper'
      justifyContent='space-between'
      alignItems='center'
      w='full'
      mx='auto'
      py={{ base: '12px', md: '24px' }}
    >
      <Logo />
      {location.pathname === '/' && (
        <List
          display={{ base: 'none', lg: 'flex' }}
          gap={5}
          color='#0b163f'
          fontWeight='600'
          fontSize='15px'
          lineHeight='26px'
        >
          <ListItem>
            <Link href='#benefits'>Benefits</Link>
          </ListItem>
          <ListItem>
            <Link href='#features'>Features</Link>
          </ListItem>
          <ListItem>
            <Link href='#usecases'>Use Cases</Link>
          </ListItem>
        </List>
      )}
      <List display='flex' alignItems='center' gap={4}>
        {isConnected && (
          <ListItem>
            <Button as={ReactRouterLink} to='/processes/create'>
              <AddIcon boxSize={{ base: 4, sm2: 3 }} />
              <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
                {t('menu.new_process')}
              </Text>
            </Button>
          </ListItem>
        )}

        {account && account?.account?.name?.default.length > 0 && (
          <ListItem>
            <Button
              as={ReactRouterLink}
              to={`/organization/${ensure0x(account?.address)}`}
              variant='secondary'
              bgColor='white'
            >
              <Icon as={MdHowToVote} boxSize={{ base: 4, sm2: 3 }} />
              <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
                {t('menu.my_org')}
              </Text>
            </Button>
          </ListItem>
        )}

        {!isConnected && (
          <>
            <ListItem>
              <Button
                onClick={() => {
                  if (openConnectModal) openConnectModal()
                }}
              >
                {t('menu.vocdoni.login').toString()}
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
                  <MenuButton as={Button} variant='dropdown' aria-label={t('menu.languages_list')} p={2}>
                    <Box as='span' display='flex' alignItems='center'>
                      <Avatar
                        src={account?.account.avatar}
                        name={account?.account.name.default || account?.address}
                        size='xs'
                      />
                      {isOpen ? (
                        <ChevronUpIcon boxSize={8} color='navbar_chevron' />
                      ) : (
                        <ChevronDownIcon boxSize={8} color='navbar_chevron' />
                      )}
                    </Box>
                  </MenuButton>
                  <MenuDropdown />
                </>
              )}
            </Menu>
          </ListItem>
        )}
      </List>
    </Flex>
  )
}

export default Navbar