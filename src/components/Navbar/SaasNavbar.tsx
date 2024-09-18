import { Button, Flex, List, ListItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import Logo from '~components/Layout/Logo'
import { LanguagesMenu } from './LanguagesList'
import { useAuth } from '~components/Auth/useAuth'

const SaasNavbar = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  let buttonText = t('menu.login')
  let to = 'signin'
  if (isAuthenticated) {
    buttonText = t('menu.dashboard', { defaultValue: 'Dashboard' })
    to = 'organization'
  }

  return (
    <Flex className='site-wrapper' w='full' mx='auto' py={{ base: '12px', md: '24px' }} position='relative'>
      <Flex justifyContent='space-between' alignItems='center' zIndex={1} w='100%'>
        <Logo />
        <List as='nav' display='flex' alignItems='center' gap={4}>
          <ListItem>
            <Button as={ReactRouterLink} to={to} width='175px' height='50px'>
              {buttonText}
            </Button>
          </ListItem>
          <ListItem>
            <LanguagesMenu />
          </ListItem>
        </List>
      </Flex>
    </Flex>
  )
}

export default SaasNavbar
