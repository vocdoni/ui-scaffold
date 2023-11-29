import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, Icon, List, ListItem, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import Logo from '~components/Layout/Logo'
import LanguagesList from './LanguagesList'
import MenuDropdown from './Menu'

const Navbar = () => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()
  const { openConnectModal } = useConnectModal()

  return (
    <Flex justifyContent='space-between' w='1920px' maxW='1920px' p={{ base: '12px 20px', md: '24px 40px' }}>
      <Logo />

      <List as='nav' display='flex' alignItems='center' gap={4}>
        {isConnected && (
          <ListItem>
            <Button variant='primary' as={ReactRouterLink} to='/processes/create' colorScheme='primary'>
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
              to={`/organization/0x${account?.address}`}
              variant='secondary'
              colorScheme='primary'
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
                variant='primary'
                onClick={() => {
                  if (openConnectModal) openConnectModal()
                }}
              >
                {t('menu.login').toString()}
              </Button>
            </ListItem>

            <ListItem>
              <Menu>
                {({ isOpen, onClose }) => (
                  <>
                    <MenuButton
                      as={Button}
                      aria-label={t('menu.burger_aria_label')}
                      sx={{ span: { margin: 'px' } }}
                      rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      minW='none'
                      bgColor='transparent'
                      _hover={{
                        bgColor: 'transparent',
                      }}
                    >
                      <FaGlobeAmericas />
                    </MenuButton>
                    <MenuList minW={16} mt={2}>
                      <LanguagesList closeOnSelect={true} />
                    </MenuList>
                  </>
                )}
              </Menu>
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
                    p={2}
                    bgColor='transparent'
                    _hover={{
                      bgColor: 'transparent',
                    }}
                    _active={{
                      bgColor: 'transparent',
                    }}
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
  )
}

export default Navbar
