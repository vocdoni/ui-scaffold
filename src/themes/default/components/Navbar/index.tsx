import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, Icon, List, ListItem, Menu, MenuButton, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [isProcess, setIsProcess] = useState(false)

  useEffect(() => {
    if (location.pathname.includes('process')) setIsProcess(true)
    else setIsProcess(false)
  }, [location.pathname])

  return (
    <Flex className='site-wrapper' w='full' mx='auto' py={{ base: '12px', md: '24px' }} position='relative'>
      <Box
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage='url(https://cdn.discordapp.com/attachments/1077657962404925583/1232347225472897096/image.png?ex=662b1a8a&is=6629c90a&hm=1ecf6bf6ee44c37267943092f897e102c2d1e684723c0c4f3775c550939556d2&)'
        bgSize='cover'
        zIndex={-1}
        filter='blur(20px)'
        opacity={0.7}
      ></Box>

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
              <Button
                as={ReactRouterLink}
                to={`/organization/${ensure0x(account?.address as string)}`}
                variant='secondary'
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
                  width='175px'
                  height='50px'
                  variant={isProcess ? 'admin' : 'primary'}
                >
                  {isProcess ? t('menu.admin').toString() : t('menu.login').toString()}
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
    </Flex>
  )
}

export default Navbar
