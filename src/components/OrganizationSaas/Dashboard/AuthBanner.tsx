import { Box, ChakraProps, Flex, Link, List, ListItem, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import DarkModeToggle from '~src/themes/saas/components/DarkMode'

interface AuthBannerProps extends ChakraProps {
  children: ReactNode
}

const AuthBanner = ({ children, ...props }: AuthBannerProps) => {
  const { t } = useTranslation()

  return (
    <Box
      flex={{ base: '1 1 100%', xl: '1 1 50%' }}
      background='linear-gradient(to bottom, #B5F492, #338B93)'
      borderBottomLeftRadius={{ xl: '200px' }}
      pt={14}
      pb={{ xl: 5 }}
    >
      <DarkModeToggle position='absolute' top={3.5} right={2.5} />
      <Flex
        flexDirection='column'
        px={{
          base: 2.5,
          sm: 5,
        }}
        textAlign='center'
        h='100%'
        maxW='600px'
        mx='auto'
        {...props}
      >
        {children}
        <Flex mt='auto' flexDirection='column' alignItems='center' justifyContent='center' color='white'>
          <List display='flex' gap={5}>
            <ListItem>
              <Link as={ReactRouterLink} fontWeight='500' to='mailto:info@vocdoni.org'>
                {t('support', { defaultValue: 'Support' })}
              </Link>
            </ListItem>
            <ListItem>
              <Link as={ReactRouterLink} fontWeight='500' to='/terms'>
                {t('terms_of_use', { defaultValue: 'Terms of use' })}
              </Link>
            </ListItem>
            <ListItem>
              <Link as={ReactRouterLink} fontWeight='500' to='https://blog.vocdoni.io/' isExternal>
                {t('blog', { defaultValue: 'Blog' })}
              </Link>
            </ListItem>
          </List>
        </Flex>
      </Flex>

      <Text
        display={{ base: 'block', xl: 'none' }}
        mt='auto'
        color='white'
        minW='100%'
        maxW={{ base: '90%', md: 96 }}
        py={5}
        textAlign='center'
      >
        {t('rights', { defaultValue: '© 2024 Vocdoni Association. All Rights Reserved.' })}
      </Text>
    </Box>
  )
}
export default AuthBanner
