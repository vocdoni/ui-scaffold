import { Button, ButtonProps, Flex, List, ListItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import DarkModeToggle from '~components/Layout/DarkMode'
import Logo from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import { LanguagesMenu } from './LanguagesList'

const Navbar = () => (
  <Flex
    width='full'
    m='0 auto'
    maxW='1920px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    w='full'
    mx='auto'
    py={{ base: '12px', md: '24px' }}
    position='relative'
  >
    <Flex justifyContent='space-between' alignItems='center' zIndex={1} w='100%'>
      <Logo />
      <List as='nav' display='flex' alignItems='center' gap={4}>
        <ListItem>
          <DashboardButton />
        </ListItem>
        <ListItem>
          <LanguagesMenu />
        </ListItem>
        <ListItem>
          <DarkModeToggle />
        </ListItem>
      </List>
    </Flex>
  </Flex>
)

const DashboardButton = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  return (
    <Button
      as={ReactRouterLink}
      to={isAuthenticated ? Routes.dashboard.base : Routes.auth.signIn}
      width='175px'
      height='50px'
      {...props}
    >
      {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
    </Button>
  )
}

export default Navbar
