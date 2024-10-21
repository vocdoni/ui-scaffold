import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import useDarkMode from '~components/Layout/useDarkMode'
import AuthBanner from '~components/Organization/Dashboard/AuthBanner'

const LayoutAuth = () => {
  const { t } = useTranslation()
  const { bg, textColorSecondary } = useDarkMode()

  return (
    <Flex bgColor={bg} minH='100vh' flexDirection={{ base: 'column', xl: 'row' }}>
      <Flex
        flex={{ base: '1 1 100%', xl: '1 1 50%' }}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex flexDirection='column' maxW={245} mx='auto' flexGrow={1}>
          <Box position='absolute' top={5} left={2.5} minW={{ base: '90%', md: 96 }}>
            <NavLink to='/'>
              <Flex align='center' w='fit-content'>
                <Icon as={FaChevronLeft} me={2} h={3} w={2} color={textColorSecondary} />
                <Text fontSize='sm' color={textColorSecondary}>
                  {t('back', { defaultValue: 'Back' })}
                </Text>
              </Flex>
            </NavLink>
          </Box>
          <Flex pt={14} minW='100%' flexGrow={1} flexDirection='column' justifyContent='center' alignItems='center'>
            <Box maxW={{ base: '90%', md: 96 }} minW={{ base: '90%', md: 96 }}>
              <Outlet />
            </Box>
          </Flex>
          <Text display={{ base: 'none', xl: 'block' }} mt='auto' color={textColorSecondary} py={5} textAlign='center'>
            {t('rights', { defaultValue: '© 2024 Vocdoni Association. All Rights Reserved.' })}
          </Text>
        </Flex>
      </Flex>
      <AuthBanner>
        <Flex flexGrow={1} alignItems='end' justifyContent='center'>
          <Box mb={24}>
            <Text fontSize='5xl' color='white' lineHeight={1} mb={0}>
              {t('auth.title', { defaultValue: 'The global voting platform' })}
            </Text>
            <Text fontSize='lg' color='white'>
              {t('auth.subtitle', { defaultValue: 'Cut costs, Save Time: Secure, Private, and GDPR Compliant Voting' })}
            </Text>
          </Box>
        </Flex>
      </AuthBanner>
    </Flex>
  )
}

export default LayoutAuth
