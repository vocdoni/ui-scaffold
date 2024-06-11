import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, Icon, List, ListItem, Menu, MenuButton, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useOrganizationHealthTools } from '~components/Account/use-account-health-tools'
import Logo from '~components/Layout/Logo'
import { LanguagesMenu } from './LanguagesList'
import MenuDropdown from './Menu'

const Navbar = () => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()
  const { openConnectModal } = useConnectModal()
  const { exists } = useOrganizationHealthTools()

  return (
    <Flex className='site-wrapper' w='full' mx='auto' py={{ base: '12px', md: '24px' }} position='relative'>
      <Flex justifyContent='space-between' alignItems='center' zIndex={1} w='100%'>
        <Logo />

        <List as='nav' display='flex' alignItems='center' gap={4}>
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

          {exists && (
            <ListItem>
              <Button as={ReactRouterLink} to={`/organization`} variant='secondary'>
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
                  width='175px'
                  height='50px'
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
                      variant='secondary'
                      boxShadow='var(--box-shadow-btn)'
                      aria-label={t('menu.languages_list')}
                      p={2}
                    >
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
    </Flex>
  )
}

export default Navbar
