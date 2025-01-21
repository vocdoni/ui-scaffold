import { Button, ButtonProps, Flex, List, ListItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import Logo from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import { LanguagesMenu } from './LanguagesList'

const Navbar = () => (
  <Flex
    width='full'
    m='0 auto'
    maxW='1920px'
    px={{
      base: 2,
      sm: 4,
      lg: 6,
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
          <ColorModeSwitcher />
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
      to={isAuthenticated ? generatePath(Routes.dashboard.base) : Routes.auth.signIn}
      size={'lg'}
      {...props}
    >
      {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
    </Button>
  )
}

export default Navbar
