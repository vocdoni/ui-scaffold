import { Box, ChakraProps, Flex, Link, List, ListItem, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import { Routes } from '~src/router/routes'

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
      pt={{ base: 20, xl: 0 }}
      pb={{ xl: 5 }}
    >
      <ColorModeSwitcher position='absolute' top={3.5} right={2.5} />
      <Flex
        flexDirection='column'
        px={{
          base: 2.5,
          sm: 5,
        }}
        textAlign='center'
        h='100%'
        mx='auto'
        {...props}
      >
        {children}
        <Flex mt='auto' flexDirection='column' alignItems='center' justifyContent='center'>
          <List display='flex' gap={5}>
            <ListItem>
              <Link as={ReactRouterLink} fontWeight='500' to='mailto:info@vocdoni.org' color={'banner_link'}>
                {t('support', { defaultValue: 'Support' })}
              </Link>
            </ListItem>
            <ListItem>
              <Link as={ReactRouterLink} fontWeight='500' to={Routes.terms} isExternal color={'banner_link'}>
                {t('terms_of_use', { defaultValue: 'Terms of use' })}
              </Link>
            </ListItem>
            <ListItem>
              <Link
                as={ReactRouterLink}
                fontWeight='500'
                to='https://blog.vocdoni.io/'
                isExternal
                color={'banner_link'}
              >
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
